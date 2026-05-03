import pool from '../db.js';

export const findAll = async () => {
  const { rows } = await pool.query('SELECT * FROM restaurant ORDER BY id');
  return rows;
};

export const findById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM restaurant WHERE id = $1', [id]);
  return rows[0];
};

export const create = async ({ name, cuisine, location }) => {
  const { rows } = await pool.query(
    `INSERT INTO restaurant (name, cuisine, location)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, cuisine, location]
  );
  return rows[0];
};


export const update = async (id, { name, cuisine, location }) => {
  const { rows } = await pool.query(
    `UPDATE restaurant
     SET name = $1, cuisine = $2, location = $3
     WHERE id = $4
     RETURNING *`,
    [name, cuisine, location, id]
  );
  return rows[0];
};


export const remove = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM restaurant WHERE id = $1 RETURNING *',
    [id]
  );
  return rows[0];
};
