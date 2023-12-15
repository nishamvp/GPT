import { connect, disconnect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

const disconnectDB = async () => {
  try {
    await disconnect();
  } catch (error) {
    console.log("Error to disconnect the MongoDB", error);
  }
};

export { connectDB, disconnectDB };
