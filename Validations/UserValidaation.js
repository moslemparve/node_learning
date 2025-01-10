import { body } from 'express-validator';
import { getDb } from '../db.js';
const UserValidation = [
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    // .custom(async (name) => {
    //   const db = getDb();
    //   const existingUser = await db.collection('users').findOne({ name });
    //   if (existingUser) {
    //     throw new Error();
    //   }
    //   return true;
    // }).withMessage('The user already exists please try another name'),
    body('age').notEmpty().withMessage('Age is required').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  ];

  export default UserValidation;