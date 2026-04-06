import pool from '../db.js';

export const getAllFavorites = async () => {
    const result = await pool.query('SELECT * FROM favorite ORDER BY id');
    return result.rows;
};

export const getFavoriteById = async (id) => {
    const result = await pool.query('SELECT * FROM favorite WHERE id = $1', [id]);
    return result.rows[0];
};

export const createFavorite = async ({
    user_id,
    restaurant_id,
    item_name,
    rating,
    notes,
    photo_url
}) => {
    const result = await pool.query(
        `INSERT INTO favorite
        (user_id, restaurant_id, item_name, rating, notes, photo_url, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW())
         RETURNING *`,
        [user_id, restaurant_id, item_name, rating, notes, photo_url]
    );

    return result.rows[0];
};

export const updateFavorite = async (id, { item_name, rating, notes, photo_url }) => {
    const result = await pool.query(
        `UPDATE favorite
        SET item_name = $1,
            rating = $2,
            notes = $3,
            photo_url = $4
        WHERE id = $5
         RETURNING *`,
        [item_name, rating, notes, photo_url, id]
    );

    return result.rows[0];
};

export const deleteFavorite = async (id) => {
    const result = await pool.query(
        'DELETE FROM favorite WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

export const getFavoriteDetails = async () => {
    const result = await pool.query(`
        SELECT
            f.id,
            f.item_name,
            f.rating,
            f.notes,
            f.photo_url,
            f.created_at,
            u.id AS user_id,
            u.email,
            r.id AS restaurant_id,
            r.name AS restaurant_name,
            r.location
        FROM favorite f
        JOIN "user" u ON f.user_id = u.id
        JOIN restaurant r ON f.restaurant_id = r.id
        ORDER BY f.id
    `);

    return result.rows;
};