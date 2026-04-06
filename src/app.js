import express from 'express';
import userRoutes from './routes/userRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world! Welcome to FlavorSaver!');
});

app.use('/users', userRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/favorites', favoriteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});