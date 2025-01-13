import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const uri = 'mongodb://127.0.0.1:27017/node';

// const dbName = 'node';

// const client = new MongoClient(uri);
let db;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

export { connectToDatabase, getDb };