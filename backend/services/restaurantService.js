import * as restaurantRepository from '../repositories/restaurantRepository.js';

const validateName = (name) => {
  if (!name || name.trim() === '') {
    const error = new Error('Restaurant name is required');
    error.statusCode = 422;
    throw error;
  }
};

export const getAll = async () => {
  return restaurantRepository.findAll();
};

export const getById = async (id) => {
  return restaurantRepository.findById(id);
};

export const create = async ({ name, cuisine, location }) => {
  validateName(name)
  return restaurantRepository.create({
    name: name.trim(),
    cuisine,
    location
  })
}


export const update = async (id, { name, cuisine, location }) => {
  validateName(name);

  const existing = await restaurantRepository.findById(id);
  if (!existing) {
    const error = new Error('Restaurant not found');
    error.statusCode = 404;
    throw error;
  }

  return restaurantRepository.update(id, { name: name.trim(), cuisine, location });
};

export const remove = async (id) => {
  const deleted = await restaurantRepository.remove(id);
  if (!deleted) {
    const error = new Error('Restaurant not found');
    error.statusCode = 404;
    throw error;
  }
  return deleted;
};
