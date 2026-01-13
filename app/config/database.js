const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST || 'db_service',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'test_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to MySQL via Pool');
        connection.release();
    }
});

module.exports = db.promise(); // Using promise-based for easier async/await
