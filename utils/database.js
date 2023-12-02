import mongoose from "mongoose";

let isConnected = false; // track if connected to the database

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true); // avoids warnings in console

  if (isConnected) {
    console.log("already connected to the database.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("connected to the database.");
  } catch (error) {
    console.log(error);
  }
};
