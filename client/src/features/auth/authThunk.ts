import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TokenAndData } from "../../types";

export const login = createAsyncThunk('auth/login', async ({ token }: { token: string }) => {
  try {

    const AUTH_URL = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;

    const { data } = await axios.get(AUTH_URL);

    const tokenAndData: TokenAndData = {
      token,
      data
    }

    return tokenAndData;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {

    localStorage.clear();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});