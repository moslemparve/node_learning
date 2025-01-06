// userController.js
import { validationResult } from 'express-validator';

export const welcomeMessage = (req, res) => {
  res.json({ message: 'Welcome to the node js' });
};

export const getUsers = (req, res) => {
  res.json({ users: ['Alice', 'Bob', 'Charlie'] });
};

export const createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, age } = req.body;
  console.log(`Received Name: ${name}, Age: ${age}`);
  res.status(201).json({ message: 'User created successfully', user: { name, age } });
};