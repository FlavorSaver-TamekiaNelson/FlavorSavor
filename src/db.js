import pkg from 'pg';
import dbConfig from './config/dbConfig.js';

const { Pool } = pkg;

const pool = new Pool(dbConfig);

export default pool;