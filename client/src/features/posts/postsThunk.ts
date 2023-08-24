import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '..';

export const fetchPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const { data } = await API.get('/posts');

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
    const { data } = await API.post('/posts', initialPost);

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ currentId, postData }: { currentId: string, postData: object }) => {
  try {

    const { data } = await API.patch(`/posts/${currentId}`, postData);

    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id: string) => {
  try {

    const { data } = await API.delete(`/posts/${id}`);

    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});

export const likePost = createAsyncThunk('posts/likePost', async (id: string) => {
  try {

    const { data } = await API.patch(`posts/${id}/likePost`);

    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});