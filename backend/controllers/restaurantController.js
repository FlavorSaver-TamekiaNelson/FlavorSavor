import * as restaurantService from '../services/restaurantService.js';

export const getAll = async (req, res, next) => {
  try {
    const restaurants = await restaurantService.getAll();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
};


export const getById = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.getById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.create(req.body);
    res.status(201).json(restaurant);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await restaurantService.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await restaurantService.remove(req.params.id);
    res.json({ message: 'Restaurant deleted successfully', deleted });
  } catch (err) {
    next(err);
  }
};
