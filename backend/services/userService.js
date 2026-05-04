import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export const getAll = async () => {
  return userRepository.findAll();
};

export const getById = async (id) => {
  return userRepository.findById(id);
};

export const create = async (data) => {
  const { email, password_hash } = data;
  if (!email || !email.trim()) throw Object.assign(new Error('Email is required'), { statusCode: 422 });
  if (!password_hash || !password_hash.trim()) throw Object.assign(new Error('Password is required'), { statusCode: 422 });
  return userRepository.create(data);
};

export const register = async ({ email, password }) => {
  if (!email || !password) throw Object.assign(new Error('Email and password are required'), { statusCode: 422 });
  const existing = await userRepository.findByEmail(email);
  if (existing) throw Object.assign(new Error('Email already in use'), { statusCode: 409 });
  const password_hash = await bcrypt.hash(password, 10);
  const user = await userRepository.create({ email, password_hash });
  return { id: user.id, email: user.email };
};

export const login = async ({ email, password }) => {
  if (!email || !password) throw Object.assign(new Error('Email and password are required'), { statusCode: 422 });
  const user = await userRepository.findByEmail(email);
  if (!user) throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { id: user.id, email: user.email } };
};