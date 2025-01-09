import { MongoClient } from 'mongodb';

// MongoDB connection URI
const uri = 'mongodb://127.0.0.1:27017';

// Database and collection names
const dbName = 'myDatabase';

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    // Return the database object for use in other modules
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
}

// Export the function
export default connectToDatabase;
