const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Main Route
router.get('/', async (req, res) => {
    try {
        // Example query to verify DB
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        console.log('Database test query result:', rows[0].solution);
        
        res.render('index', { 
            title: 'Express Docker Setup',
            db_status: 'Connected'
        });
    } catch (err) {
        console.error('Database connection error:', err.message);
        res.render('index', { 
            title: 'Express Docker Setup',
            db_status: 'Disconnected (' + err.message + ')'
        });
    }
});

module.exports = router;