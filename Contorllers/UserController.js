// userController.js
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';
import User from '../Models/User.js';

export const welcomeMessage = (req, res) => {
  res.json({ message: 'Welcome to node js' });
};

export const getUsers = async (req, res,db) => {
    const users = await User.find({});
    return res.status(200).json(users);
};

export const createUser = async (req, res,db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, age } = req.body;

    const newUser = new User({ name, age });
    await newUser.save();
    res.status(201).json({
      message: 'User inserted successfully',
    });

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
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, age },
    { new: true, runValidators: true }
  );

    return res.status(200).json({ message: 'User updated successfully'});
 
}
export const deleteUser = async (req, res, db) => {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  const newUser =  await User.deleteOne({_id: new ObjectId(userId)});

    return res.status(200).json({ message: 'User deleted successfully' });

};