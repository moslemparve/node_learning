// userController.js
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';
import User from '../Models/User.js';
import fs from 'fs/promises';
import path from 'path';


export const welcomeMessage = (req, res) => {
  res.json({ message: 'Welcome to node js' });
};

export const getUsers = async (req, res,db) => {
    const users = await User.find({});
    return res.status(200).json(users);
};

export const createUser = async (req, res,db) => {

  const { name, age } = req.body;
  const file = req.files ? req.files.file : null;
  const filePath = file ? `uploads/${Date.now()}${path.extname(file.name)}` : null;
  try {

    const newUser = new User({ name, age ,file:filePath});
    await newUser.save();
    if (file) {
      await file.mv(filePath);
    }
    return res.status(201).json(newUser);
  } catch (error) {
    if (filePath) {
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.error('Failed to delete file:', err);
      }
    }
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({ msg: err.message, path: err.path }));
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ errors: [{ msg: error.message }] });
  }
   

};

export const  getUser = async (req, res ,db) => {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);

}
export const updateUser = async (req, res, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.params.id;
  const { name, age } = req.body;
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  try {
    const existingUser = await User.findById(userId);
    existingUser.name = name;
    existingUser.age = age;
    await existingUser.save();
    return res.status(200).json({ message: 'User updated successfully'});

  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({ msg: err.message, path: err.path }));
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ errors: [{ msg: error.message }] });
  }

 
}
export const deleteUser = async (req, res, db) => {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  const newUser =  await User.deleteOne({_id: new ObjectId(userId)});

    return res.status(200).json({ message: 'User deleted successfully' });

};