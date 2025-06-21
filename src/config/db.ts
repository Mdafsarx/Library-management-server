import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.zgmhkd0.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error(`MongoDB connection failed:${error}`);
    process.exit(1);
  }
};