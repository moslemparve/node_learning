import { Router } from 'express';
import { welcomeMessage, getUsers, createUser ,getUser,updateUser,deleteUser } from '../Contorllers/UserController.js';
import UserValidation from '../Validations/UserValidaation.js';
import adminMiddleware from '../Middleware/adminMiddleware.js';
import connectToDatabase from '../db.js';
import multer from 'multer';

const router = Router();
connectToDatabase();

router.get('/', welcomeMessage);

router.get('/get/users',(req, res) => getUsers(req, res));
router.post('/create/user',(req, res) => createUser(req, res));
router.get('/get/user/:id', (req, res) => getUser(req, res));
router.post('/update/user/:id', UserValidation, (req, res) => updateUser(req, res));
router.delete('/delete/user/:id', (req, res) => deleteUser(req, res));
router.get('/admin', adminMiddleware('admin'), (req, res) => {
    res.json({ message: 'Welcome Admin' });
  });

export default router;
