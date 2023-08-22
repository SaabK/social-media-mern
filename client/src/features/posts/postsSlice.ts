import { createSlice } from '@reduxjs/toolkit';
import { createPost, deletePost, fetchPosts, likePost, updatePost } from './postsThunk';
import { PostsState } from '../../types';

const initialState: PostsState = {
  posts: [],
  error: '',
  status: 'idle' // idle | success | failed | loading
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'success';

        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string
      })

      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts.push(action.payload.data);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string
      })

      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post);
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string
      })

      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'success';

        console.log(action.payload.data)

        state.posts = state.posts.filter(post => post._id !== action.payload.data);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string
      })

      .addCase(likePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = 'success';

        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string
      })
  },
})

// export const {  } = postsSlice.actions

export default postsSlice.reducer