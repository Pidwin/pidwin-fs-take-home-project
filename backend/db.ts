import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URL || "mongodb://localhost:27017/mydb";
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    } as mongoose.ConnectOptions);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
