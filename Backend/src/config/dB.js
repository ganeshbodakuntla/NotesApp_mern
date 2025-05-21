import mongoose from "mongoose";
export const connectdB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connection established successfully");
  } catch (error) {
    console.error("error connecting mongoDB", error);
  }
};
mongoose.connect;
