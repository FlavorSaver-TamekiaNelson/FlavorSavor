import express from 'express';
import * as controller from '../controllers/userController.js';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.post('/register', controller.register);
router.post('/login', controller.login);

export default router;