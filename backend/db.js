import pkg from 'pg';
import dbConfig from './config/dbConfig.js';

const { Pool } = pkg;

const pool = new Pool(dbConfig);
pool.on('error', (err) => {
    console.error('🔥 Unexpected DB error:', err);
});
export default pool;