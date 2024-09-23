import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://sanskarjaiswalcdmec21:brownringtest@cluster0.ulgcjxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Could Connect to DB ${error.message}`);
  }
};
export default connectDB;
