import { body } from 'express-validator';

const UserValidation = [
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('age').notEmpty().withMessage('Age is required').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  ];

  export default UserValidation;