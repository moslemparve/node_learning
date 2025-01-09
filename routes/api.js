import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { welcomeMessage, getUsers, createUser } from '../Contorllers/UserController.js';
import UserValidation from '../Validations/UserValidaation.js';
import adminMiddleware from '../Middleware/adminMiddleware.js';
const router = Router();
import connectToDatabase from './db.js';
let db; // Store the database object globally

connectToDatabase()
  .then((database) => {
    db = database;
    console.log('Database connection established');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });


router.get('/', welcomeMessage);

router.get('/users',getUsers);

router.post('/users',UserValidation,createUser);

router.get('/admin', adminMiddleware('admin'), (req, res) => {
    res.json({ message: 'Welcome Admin' });
  });

export default router;
