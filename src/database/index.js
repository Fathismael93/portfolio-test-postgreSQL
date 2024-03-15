import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Database connected successfully");
  } catch (e) {
    console.log(e);
  }
}