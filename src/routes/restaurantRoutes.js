import express from 'express';
import * as restaurantController from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', restaurantController.getRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', restaurantController.createRestaurant);

export default router;