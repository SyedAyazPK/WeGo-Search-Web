import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../helpers/axiosInstance";
const url = `http://localhost:4000/api/v1`;

export const addMessages = createAsyncThunk(
  "chat/addMessages",
  async (params) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/chat/addmsg`,
        params
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (params) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/chat/getmsg`,
        params
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    msgs: null,
    remoteUser: {},
    socket: {},
  },
  reducers: {
    setRemoteUser: (state, action) => {
      state.remoteUser = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
  extraReducers: {
    [getMessages.fulfilled]: (state, action) => {
      state.msgs = action.payload;
    },
  },
});

export const { setRemoteUser, setSocket } = chatSlice.actions;

export const selectRemoteUser = ({ chat }) => chat?.remoteUser;

export const selectSocket = ({ chat }) => chat?.socket;

export const selectMsgs = ({ chat }) => chat?.msgs;

export default chatSlice.reducer;
