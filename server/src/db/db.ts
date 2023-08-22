import mongoose from "mongoose";

const URL = 'mongodb://127.0.0.1:27017/memories';

export default async () => {
  mongoose.connect(URL).then(() => console.log("Connected To Mongo successfully")).catch(err => console.log(err));
}