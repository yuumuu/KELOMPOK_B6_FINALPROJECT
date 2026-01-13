const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcryptjs');

// ==========================================
// MIDDLEWARE: Check Login
// ==========================================
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

const isGuest = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
};

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// Login Page
router.get('/login', isGuest, (req, res) => {
    res.render('login', { title: 'Login', db_status: 'Connected', error: null });
});

// Login Process
router.post('/login', isGuest, async (req, res) => {
    try {
        const { username, password } = req.body;
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.render('login', { title: 'Login', db_status: 'Connected', error: 'User not found' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render('login', { title: 'Login', db_status: 'Connected', error: 'Wrong password' });
        }

        // Set Session
        req.session.user = { id: user.id, username: user.username, name: user.name };
        res.redirect('/');
    } catch (err) {
        res.render('login', { title: 'Login', db_status: 'Error', error: err.message });
    }
});

// Register Page
router.get('/register', isGuest, (req, res) => {
    res.render('register', { title: 'Register', db_status: 'Connected', error: null });
});

// Register Process
router.post('/register', isGuest, async (req, res) => {
    try {
        const { name, username, password } = req.body;
        
        // Cek username kembar
        const [existing] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.render('register', { title: 'Register', db_status: 'Connected', error: 'Username already taken' });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert DB
        await db.query('INSERT INTO users (name, username, password) VALUES (?, ?, ?)', [name, username, hashedPassword]);
        
        res.redirect('/login');
    } catch (err) {
        res.render('register', { title: 'Register', db_status: 'Error', error: err.message });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// ==========================================
// TIMELINE & POSTS
// ==========================================

// Home / Timeline
router.get('/', async (req, res) => {
    try {
        const [posts] = await db.query(`
            SELECT 
                p.id, p.content, p.likes, p.created_at,
                u.username, u.name,
                (SELECT COUNT(*) FROM posts WHERE parent_id = p.id) as reply_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.parent_id IS NULL
            ORDER BY p.created_at DESC
        `);

        res.render('index', {
            title: 'Home',
            db_status: 'Connected',
            posts
        });
    } catch (err) {
        console.error(err);
        res.send('Database Error');
    }
});

// Detail Thread
router.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [postRows] = await db.query(`
            SELECT p.*, u.username, u.name,
            (SELECT COUNT(*) FROM posts WHERE parent_id = p.id) as reply_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.id=?
        `, [id]);

        if (postRows.length === 0) return res.status(404).send('Post not found');

        const [replies] = await db.query(`
            SELECT p.*, u.username, u.name
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.parent_id=?
            ORDER BY p.created_at ASC
        `, [id]);

        res.render('detail', {
            title: 'Thread',
            db_status: 'Connected',
            post: postRows[0],
            replies
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

// ==========================================
// ACTIONS (Create, Reply, etc) - Protected
// ==========================================

// Create Post
router.post('/posts', isAuthenticated, async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.session.user.id; // Ambil ID dari session

        await db.query('INSERT INTO posts (user_id, content) VALUES (?, ?)', [userId, content]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating post');
    }
});

// Create Reply
router.post('/posts/:id/reply', isAuthenticated, async (req, res) => {
    try {
        const parentId = req.params.id;
        const { content } = req.body;
        const userId = req.session.user.id;

        await db.query('INSERT INTO posts (user_id, content, parent_id) VALUES (?, ?, ?)', [userId, content, parentId]);
        res.redirect(`/posts/${parentId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error replying');
    }
});

module.exports = router;