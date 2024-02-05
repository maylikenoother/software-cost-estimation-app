import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connect = async () => {
  const dbURI = process.env.MONGODB_URI as string;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions;

  try {
    await mongoose.connect(dbURI, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connect;
