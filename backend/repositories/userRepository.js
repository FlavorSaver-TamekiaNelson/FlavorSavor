import pool from '../db.js';

export const findAll = async () => {
  const { rows } = await pool.query('SELECT * FROM "user" ORDER BY id');
  return rows;
};

export const findById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
  return rows[0];
};

export const findByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
  return rows[0];
};

export const create = async ({ email, password_hash }) => {
  const { rows } = await pool.query(
    `INSERT INTO "user" (email, password_hash, created_at)
     VALUES ($1, $2, NOW())
     RETURNING *`,
    [email, password_hash]
  );
  return rows[0];
};
