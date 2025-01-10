import { Router } from 'express';
import { welcomeMessage, getUsers, createUser ,getUser,updateUser,deleteUser } from '../Contorllers/UserController.js';
import UserValidation from '../Validations/UserValidaation.js';
import adminMiddleware from '../Middleware/adminMiddleware.js';
const router = Router();
import {connectToDatabase} from '../db.js';
let db; 

connectToDatabase()
  .then((database) => {
    db = database;
    console.log('Database connection established');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });


router.get('/', welcomeMessage);

router.get('/get/users',(req, res) => getUsers(req, res, db));
router.post('/create/user', UserValidation, (req, res) => createUser(req, res, db));
router.get('/get/user/:id', (req, res) => getUser(req, res, db));
router.post('/update/user/:id', UserValidation, (req, res) => updateUser(req, res, db));
router.delete('/delete/user/:id', (req, res) => deleteUser(req, res, db));
router.get('/admin', adminMiddleware('admin'), (req, res) => {
    res.json({ message: 'Welcome Admin' });
  });

export default router;
