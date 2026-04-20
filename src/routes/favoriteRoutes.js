import express from 'express';
import * as favoriteController from '../controllers/favoriteController.js';

const router = express.Router();

router.get('/details/all', favoriteController.getFavoriteDetails);
router.get('/', favoriteController.getFavorites);
router.get('/:id', favoriteController.getFavoriteById);
router.post('/', favoriteController.createFavorite);
router.put('/:id', favoriteController.updateFavorite);
router.delete('/:id', favoriteController.deleteFavorite);

export default router;