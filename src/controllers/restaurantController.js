import * as restaurantService from '../services/restaurantService.js';

export const getRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurantService.getRestaurants();
        res.json(restaurants);
    } catch (err) {
        console.error('Error fetching restaurants:', err.message);
        res.status(500).json({ error: 'Error fetching restaurants' });
    }
};

export const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await restaurantService.getRestaurant(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.json(restaurant);
    } catch (err) {
        console.error('Error fetching restaurant:', err.message);
        res.status(500).json({ error: 'Error fetching restaurant' });
    }
};

export const createRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurantService.addRestaurant(req.body);
        res.status(201).json(restaurant);
    } catch (err) {
        console.error('Error creating restaurant:', err.message);
        res.status(400).json({ error: err.message });
    }
};