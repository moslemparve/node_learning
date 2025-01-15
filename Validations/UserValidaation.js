import { body } from 'express-validator';
import User from '../Models/User.js';

const checkNameExists = async (name, userId = null) => {
  const query = userId ? { name, _id: { $ne: userId } } : { name };
  const existingUser = await User.findOne(query);
  if (existingUser) {
    throw new Error('The user already exists, please try another name');
  }
};

const UserValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .custom(async (name, { req }) => {
      const userId = req.params.id;
      await checkNameExists(name, userId);
      return true;
    }),
  body('age')
    .notEmpty().withMessage('Age is required')
    .isInt({ min: 1 }).withMessage('Age must be a positive integer'),
];

export default UserValidation;