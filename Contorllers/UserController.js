// userController.js
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';

export const welcomeMessage = (req, res) => {
  res.json({ message: 'Welcome to the node js' });
};

export const getUsers = async (req, res,db) => {
    const users = await db.collection('users').find({}).toArray();
    return res.status(200).json(users);
};

export const createUser = async (req, res,db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, age } = req.body;

  try {
    const collection = db.collection('users'); 
    // const result = await collection.insertOne({ name, age }); 
    res.status(201).json({
      message: 'User inserted successfully',
      userId: result.insertedId,
    });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Failed to insert user' });
  }
};

export const  getUser = async (req, res ,db) => {
    const userId = req.params.id;

    // Validate the user ID
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Find the user by ID
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
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

    const collection = db.collection('users');
   await collection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { name, age } },
    );
    return res.status(200).json({ message: 'User updated successfully'});
 
}
export const deleteUser = async (req, res, db) => {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const collection = db.collection('users');
  const result = await collection.deleteOne({ _id: new ObjectId(userId) });


    return res.status(200).json({ message: 'User deleted successfully' });

};