const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const dbURL = process.env.DB_URL;

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    const client = await MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB!');
    const db = client.db();
    return { client, db };
    console.log("Database connected : ");
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    throw err;
  }
};

module.exports = connectToMongoDB;
