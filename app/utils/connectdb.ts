import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONOG_URL!);
    console.log("db connected");
  } catch (error) {
    console.log("Unable to connect db");
  }
};
