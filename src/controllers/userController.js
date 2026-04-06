import * as userService from '../services/userService.js';

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ error: 'Error fetching users' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err.message);
        res.status(500).json({ error: 'Error fetching user' });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await userService.addUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(400).json({ error: err.message });
    }
};