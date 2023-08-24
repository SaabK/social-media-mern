import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IFormData, TokenAndData } from "../../types";
import { NavigateFunction } from "react-router-dom";

const URL = 'http://localhost:3000';

export const login = createAsyncThunk('auth/login', async ({ token }: { token: string }) => {
  try {

    const AUTH_URL = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;

    const { data } = await axios.get(AUTH_URL);

    const tokenAndData: TokenAndData = {
      token,
      data
    }

    console.log(data);

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

export const signin = createAsyncThunk('auth/signin', async ({ formData, navigate }: { formData: IFormData, navigate: NavigateFunction }) => {
  try {

    const { data } = await axios.post(`${URL}/auth/signin`, formData);

    navigate('/');

    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});

export const signup = createAsyncThunk('auth/signup', async ({ formData, navigate }: { formData: IFormData, navigate: NavigateFunction }) => {
  try {

    const { data } = await axios.post(`${URL}/auth/signup`, formData);

    navigate('/');

    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});