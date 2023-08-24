import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;