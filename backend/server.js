import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import restaurantRoutes from './routes/restaurantRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import userRoutes from './routes/userRoutes.js';

import pool from './db.js';

pool.query('SELECT NOW()')
  .then(res => console.log('✅ DB CONNECTED:', res.rows[0]))
  .catch(err => console.error('DB CONNECTION FAILED:', err));

const app = express();

app.use(cors({
    origin: [
  'http://localhost:5174',
  'https://salmon-water-073aac80f.7.azurestaticapps.net'
],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.get('/test', (req, res) => {
    res.send('OK');
});

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Flavor Savor API is running');
});

setInterval(() => {
  console.log('server alive...');
}, 10000);