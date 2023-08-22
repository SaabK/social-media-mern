import { Request, Response } from 'express';
import PostMessage from '../models/postMessage';
import mongoose from 'mongoose';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error: any) {
    res.status(404).json({ data: error.message })
  }
}

export const createPost = async (req: Request, res: Response) => {

  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json({ success: true, data: newPost });
  } catch (error: any) {
    res.status(409).json({ success: false, data: error.message })
  }
}

export const updatePost = async (req: Request, res: Response) => {

  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ success: false, data: 'No post with that id' });

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { _id, ...post }, { new: true });

    res.json({ success: true, data: updatedPost });

  } catch (error: any) {
    res.status(409).json({ success: false, data: error.message })
  }
}

export const deletePost = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ success: false, data: 'No post with that id' });

  try {
    await PostMessage.findByIdAndRemove(_id);

    res.json({ success: true, data: _id })
  } catch (error: any) {
    res.status(409).json({ success: false, data: error.message })
  }
}

export const likePost = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ success: false, data: 'No post with that id' });

  try {

    const likedPost = await PostMessage.findOneAndUpdate(
      { _id },
      { $inc: { likeCount: 1 } },
      { new: true }
    );

    res.json({ success: true, data: likedPost })
  } catch (error: any) {
    res.status(409).json({ success: false, data: error.message })
  }
}