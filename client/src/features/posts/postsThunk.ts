import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = `http://localhost:3000/posts`;

export const fetchPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const { data } = await axios.get(url);

    // 👇 Not Necessary
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});

export const createPost = createAsyncThunk('posts/createPost', async (initialPost: object) => {
  try {
    const { data } = await axios.post(url, initialPost);

    // 👇 Not Necessary
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ currentId, postData }: { currentId: string, postData: object }) => {
  try {

    const { data } = await axios.patch(`${url}/${currentId}`, { ...postData });

    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id: string) => {
  try {

    const { data } = await axios.delete(`${url}/${id}`);

    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});

export const likePost = createAsyncThunk('posts/likePost', async (id: string) => {
  try {

    const { data } = await axios.patch(`${url}/${id}/likePost`);

    console.log(data);

    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});