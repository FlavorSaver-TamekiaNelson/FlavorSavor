import * as restaurantRepository from '../repositories/restaurantRepository.js';

export const getRestaurants = async () => {
    return await restaurantRepository.getAllRestaurants();
};

export const getRestaurant = async (id) => {
    return await restaurantRepository.getRestaurantById(id);
};

export const addRestaurant = async (data) => {
    const { name, location } = data;

    if (!name) {
        throw new Error('Restaurant name is required');
    }

    return await restaurantRepository.createRestaurant({ name, location });
};