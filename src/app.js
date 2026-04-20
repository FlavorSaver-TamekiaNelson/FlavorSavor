import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/favorites', favoriteRoutes);

app.get('/', (req, res) => {
    res.send('Hello, world! Welcome to FlavorSaver!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});