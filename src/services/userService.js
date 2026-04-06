import * as userRepository from '../repositories/userRepository.js';

export const getUsers = async () => {
    return await userRepository.getAllUsers();
};

export const getUser = async (id) => {
    return await userRepository.getUserById(id);
};

export const addUser = async (data) => {
    const { email, password_hash } = data;

    if (!email || !password_hash) {
        throw new Error('Email and password_hash are required');
    }

    return await userRepository.createUser({ email, password_hash });
};