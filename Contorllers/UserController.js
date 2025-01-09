// userController.js
import { validationResult } from 'express-validator';

export const welcomeMessage = (req, res) => {
  res.json({ message: 'Welcome to the node js' });
};

export const getUsers = (req, res) => {
  res.json({ users: ['Alice', 'Bob', 'Charlie'] });
};

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, age } = req.body;

  try {
    const collection = db.collection('users'); // Connect to the "users" collection
    const result = await collection.insertOne({ name, age }); // Insert the data
    res.status(201).json({
      message: 'User inserted successfully',
      userId: result.insertedId,
    });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Failed to insert user' });
  }
  // console.log(`Received Name: ${name}, Age: ${age}`);
  // res.status(201).json({ message: 'User created successfully', user: { name, age } });
};