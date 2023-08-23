import { createSlice } from '@reduxjs/toolkit';
import { AuthState, TokenAndData } from '../../types';
import { login, logout } from './authThunk';

export const initialState: AuthState = {
  authData: JSON.parse(localStorage.getItem('profile') as string) || null,
  status: 'idle',
  error: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success';
        const tokenAndData: TokenAndData = action.payload;

        localStorage.setItem("profile", JSON.stringify({ ...tokenAndData }));

        state.authData = tokenAndData;

      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string
      })

      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'success';

        state.authData = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string
      })
  },
})

// export const {  } = postsSlice.actions

export default authSlice.reducer