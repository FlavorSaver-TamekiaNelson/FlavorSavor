import pool from './db.js';

const testDB = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected:', res.rows[0]);
        pool.end();
    } catch (err) {
        console.error('Database connection error:', err);
    }
};

testDB();