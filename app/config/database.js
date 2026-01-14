const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST       || 'db_service',
    user: process.env.DB_USER       || 'b6_user',
    password: process.env.DB_PASS   || 'b6_password',
    database: process.env.DB_NAME   || 'bblog',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const db = mysql.createPool(dbConfig);

// Test connection with retry logic
const testConnection = (retries = 5, delay = 3000) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error(`Database connection failed (${retries} retries left):`, err.message);
            if (retries > 0) {
                console.log(`Retrying in ${delay/1000} seconds...`);
                setTimeout(() => testConnection(retries - 1, delay), delay);
            } else {
                console.error('❌ Could not connect to database after multiple attempts');
            }
        } else {
            console.log('✅ Connected to MySQL via Pool');
            connection.release();
        }
    });
};

// Start connection test
testConnection();

module.exports = db.promise(); // Using promise-based for easier async/await
