import * as favoriteService from '../services/favoriteService.js';

export const getAll = async (req, res, next) => {
  try {
    const favorites = await favoriteService.getAll();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const favorite = await favoriteService.getById(req.params.id);
    if (!favorite) return res.status(404).json({ error: 'Favorite not found' });
    res.json(favorite);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const favorite = await favoriteService.create(req.body);
    res.status(201).json(favorite);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await favoriteService.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await favoriteService.remove(req.params.id);
    res.json({ message: 'Favorite deleted successfully', deleted });
  } catch (err) {
    next(err);
  }
};

export const getDetails = async (req, res, next) => {
  try {
    const detailed = await favoriteService.getDetails();
    res.json(detailed);
  } catch (err) {
    next(err);
  }
};
