import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const uri = 'mongodb://127.0.0.1:27017/node';

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}



export default connectToDatabase;