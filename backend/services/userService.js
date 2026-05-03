import * as userRepository from '../repositories/userRepository.js';

const validateUser = (data) => {
  const { email, password_hash } = data;

  if (!email || !email.trim()) {
    const err = new Error('Email is required');
    err.statusCode = 422;
    throw err;
  }

  if (!password_hash || !password_hash.trim()) {
    const err = new Error('Password hash is required');
    err.statusCode = 422;
    throw err;
  }
};

export const getAll = async () => {
  return userRepository.findAll();
};

export const getById = async (id) => {
  return userRepository.findById(id);
};

export const create = async (data) => {
  validateUser(data);
  return userRepository.create(data);
};
