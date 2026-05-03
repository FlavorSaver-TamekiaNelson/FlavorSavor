import pool from '../db.js';

export const findAll = async () => {
  const { rows } = await pool.query('SELECT * FROM favorite ORDER BY id');
  return rows;
};

export const findById = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM favorite WHERE id = $1',
    [id]
  );
  return rows[0];
};

export const create = async ({
  user_id,
  restaurant_id,
  item_name,
  rating,
  notes,
  photo_url
}) => {
  const { rows } = await pool.query(
    `INSERT INTO favorite
      (user_id, restaurant_id, item_name, rating, notes, photo_url, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     RETURNING *`,
    [user_id, restaurant_id, item_name, rating, notes, photo_url]
  );
  return rows[0];
};

export const update = async (
  id,
  { item_name, rating, notes, photo_url }
) => {
  const { rows } = await pool.query(
    `UPDATE favorite
       SET item_name = $1,
           rating = $2,
           notes = $3,
           photo_url = $4
     WHERE id = $5
     RETURNING *`,
    [item_name, rating, notes, photo_url, id]
  );
  return rows[0];
};

export const remove = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM favorite WHERE id = $1 RETURNING *',
    [id]
  );
  return rows[0];
};

export const findDetails = async () => {
  const { rows } = await pool.query(`
    SELECT
      f.id,
      f.item_name,
      f.rating,
      f.notes,
      f.photo_url,
      f.created_at,

      u.id AS user_id,
      u.email AS user_email,

      r.id AS restaurant_id,
      r.name AS restaurant_name,
      r.location AS restaurant_location,

      COALESCE(
        ARRAY_AGG(t.name) FILTER (WHERE t.name IS NOT NULL),
        '{}'
      ) AS tags

    FROM favorite f
    JOIN "user" u ON f.user_id = u.id
    JOIN restaurant r ON f.restaurant_id = r.id

    LEFT JOIN favorite_tag ft ON f.id = ft.favorite_id
    LEFT JOIN tag t ON t.id = ft.tag_id

    GROUP BY
      f.id,
      u.id,
      r.id

    ORDER BY f.id;
  `);

  return rows;
};
