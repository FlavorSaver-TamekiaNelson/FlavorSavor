import express from 'express';
import * as controller from '../controllers/userController.js';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);

export default router;
