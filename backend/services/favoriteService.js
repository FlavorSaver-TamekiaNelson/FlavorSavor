import * as favoriteRepository from '../repositories/favoriteRepository.js';

const validateFields = (data, requiredFields) => {
  for (const field of requiredFields) {
    if (!data[field] || data[field].toString().trim() === '') {
      const err = new Error(`${field} is required`);
      err.statusCode = 422;
      throw err;
    }
  }
};

export const getAll = async () => {
  return favoriteRepository.findAll();
};

export const getById = async (id) => {
  return favoriteRepository.findById(id);
};

export const create = async (data) => {
  validateFields(data, ['user_id', 'restaurant_id', 'item_name']);
  return favoriteRepository.create(data);
};

export const update = async (id, data) => {
  validateFields(data, ['item_name']);

  const existing = await favoriteRepository.findById(id);
  if (!existing) {
    const err = new Error('Favorite not found');
    err.statusCode = 404;
    throw err;
  }

  return favoriteRepository.update(id, data);
};

export const remove = async (id) => {
  const deleted = await favoriteRepository.remove(id);
  if (!deleted) {
    const err = new Error('Favorite not found');
    err.statusCode = 404;
    throw err;
  }
  return deleted;
};

export const getDetails = async () => {
  return favoriteRepository.findDetails();
};
