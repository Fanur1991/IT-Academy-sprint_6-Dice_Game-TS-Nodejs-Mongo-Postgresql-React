import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
  }
};

export default connectMongoDB;
