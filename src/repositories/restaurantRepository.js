import pool from '../db.js';

export const getAllRestaurants = async () => {
    const result = await pool.query('SELECT * FROM restaurant ORDER BY id');
    return result.rows;
};

export const getRestaurantById = async (id) => {
    const result = await pool.query('SELECT * FROM restaurant WHERE id = $1', [id]);
    return result.rows[0];
};

export const createRestaurant = async ({ name, location }) => {
    const result = await pool.query(
        `INSERT INTO restaurant (name, location)
        VALUES ($1, $2)
        RETURNING *`,
        [name, location]
    );
    return result.rows[0];
};