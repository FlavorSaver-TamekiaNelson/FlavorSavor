import * as favoriteRepository from '../repositories/favoriteRepository.js';

export const getFavorites = async () => {
    return await favoriteRepository.getAllFavorites();
};

export const getFavorite = async (id) => {
    return await favoriteRepository.getFavoriteById(id);
};

export const addFavorite = async (data) => {
    const { user_id, restaurant_id, item_name } = data;

    if (!user_id || !restaurant_id || !item_name) {
        throw new Error('user_id, restaurant_id, and item_name are required');
    }

    return await favoriteRepository.createFavorite(data);
};

export const editFavorite = async (id, data) => {
    const { item_name, rating, notes, photo_url } = data;

    if (!item_name) {
        throw new Error('item_name is required');
    }

    return await favoriteRepository.updateFavorite(id, {
        item_name,
        rating,
        notes,
        photo_url
    });
};

export const removeFavorite = async (id) => {
    return await favoriteRepository.deleteFavorite(id);
};

export const getDetailedFavorites = async () => {
    return await favoriteRepository.getFavoriteDetails();
};