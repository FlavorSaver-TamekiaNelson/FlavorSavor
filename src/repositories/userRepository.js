import pool from '../db.js';

export const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM "user" ORDER BY id');
    return result.rows;
};

export const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
    return result.rows[0];
};

export const createUser = async ({ email, password_hash }) => {
    const result = await pool.query(
        `INSERT INTO "user" (email, password_hash, created_at)
        VALUES ($1, $2, NOW())
        RETURNING *`,
        [email, password_hash]
    );
    return result.rows[0];
};