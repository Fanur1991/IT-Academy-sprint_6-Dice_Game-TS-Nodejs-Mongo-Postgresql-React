import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongoDB = async () => {
  const URI = process.env.MONGO_DB_URI;
  
  if (!URI) {
    console.error('MONGO_DB_URI is not defined.');
    process.exit(1);
  }

  try {
    await mongoose.connect(URI as string);
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
  }
};

export default connectMongoDB;
