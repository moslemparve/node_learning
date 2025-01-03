import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { welcomeMessage, getUsers, createUser } from '../Contorllers/UserController.js';

const router = Router();


router.get('/', welcomeMessage);

router.get('/users',getUsers);

router.post('/users',[
  body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('age').notEmpty().withMessage('Age is required').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
],createUser);

export default router;
