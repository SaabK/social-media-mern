import { Request, Response } from 'express';
import PostMessage from '../models/postMessage';
import mongoose from 'mongoose';
import { BigRequest } from '../types';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error: any) {
    res.status(404).json({ data: error.message })
  }
}

export const createPost = async (req: BigRequest, res: Response) => {

  const post = req.body;

  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

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

export const likePost = async (req: BigRequest, res: Response) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ success: false, data: 'No post with that id' });

  try {

    if (!req.userId) return res.json({ success: false, data: "Not Authenticated" });

    const post = await PostMessage.findById(_id);

    if (!post) return res.json({ success: false, data: "Not such post exists" })

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter(id => id !== String(req.userId));
    }

    const likedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json({ success: true, data: likedPost })
  } catch (error: any) {
    console.log(error);
    res.status(409).json({ success: false, data: error.message })
  }
}