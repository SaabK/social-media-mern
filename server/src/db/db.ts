import mongoose from "mongoose";

export default async () => {
  await mongoose.connect(process.env.CONNECTION_URL!).then(() => console.log("Connected To Mongo successfully")).catch(err => console.log(err));
}