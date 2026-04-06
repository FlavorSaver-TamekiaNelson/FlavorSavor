import * as favoriteService from '../services/favoriteService.js';

export const getFavorites = async (req, res) => {
    try {
        const favorites = await favoriteService.getFavorites();
        res.json(favorites);
    } catch (err) {
        console.error('Error fetching favorites:', err.message);
        res.status(500).json({ error: 'Error fetching favorites' });
    }
};

export const getFavoriteById = async (req, res) => {
    try {
        const favorite = await favoriteService.getFavorite(req.params.id);

        if (!favorite) {
            return res.status(404).json({ error: 'Favorite not found' });
        }

        res.json(favorite);
    } catch (err) {
        console.error('Error fetching favorite:', err.message);
        res.status(500).json({ error: 'Error fetching favorite' });
    }
};

export const createFavorite = async (req, res) => {
    try {
        const favorite = await favoriteService.addFavorite(req.body);
        res.status(201).json(favorite);
    } catch (err) {
        console.error('Error creating favorite:', err.message);
        res.status(400).json({ error: err.message });
    }
};

export const updateFavorite = async (req, res) => {
    try {
        const favorite = await favoriteService.editFavorite(req.params.id, req.body);

        if (!favorite) {
            return res.status(404).json({ error: 'Favorite not found' });
        }

        res.json(favorite);
    } catch (err) {
        console.error('Error updating favorite:', err.message);
        res.status(400).json({ error: err.message });
    }
};

export const deleteFavorite = async (req, res) => {
    try {
        const deleted = await favoriteService.removeFavorite(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Favorite not found' });
        }

        res.json({ message: 'Favorite deleted successfully', favorite: deleted });
    } catch (err) {
        console.error('Error deleting favorite:', err.message);
        res.status(500).json({ error: 'Error deleting favorite' });
    }
};

export const getFavoriteDetails = async (req, res) => {
    try {
        const favorites = await favoriteService.getDetailedFavorites();
        res.json(favorites);
    } catch (err) {
        console.error('Error fetching favorite details:', err.message);
        res.status(500).json({ error: 'Error fetching favorite details' });
    }
};