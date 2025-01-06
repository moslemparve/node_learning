import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { welcomeMessage, getUsers, createUser } from '../Contorllers/UserController.js';
import UserValidation from '../Validations/UserValidaation.js';
import adminMiddleware from '../Middleware/adminMiddleware.js';
const router = Router();


router.get('/', welcomeMessage);

router.get('/users',getUsers);

router.post('/users',UserValidation,createUser);

router.get('/admin', adminMiddleware('admin'), (req, res) => {
    res.json({ message: 'Welcome Admin' });
  });

export default router;
