import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../helpers/axiosInstance';
const url = `http://localhost:4000/api/v1`;

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (params) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user`,
        params
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const loginUser = createAsyncThunk('user/loginUser', async (params) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      params
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
});
export const addFriend = createAsyncThunk('user/addFriend', async (params) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}/user/friend`,
      params
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
});
export const acceptRequest = createAsyncThunk(
  'user/acceptRequest',
  async (params) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/user/friend`,
        params
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);
export const rejectRequest = createAsyncThunk(
  'user/rejectRequest',
  async (params) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/user/friend`,
        params
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const allFriends = createAsyncThunk(
  'user/allFriends',
  async (params) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/user/friend/${params}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const getNotifications = createAsyncThunk(
  'user/getNotifications',
  async (params) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/notifications?to=${params}`
      );
      return response.data?.reverse();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);
export const readNotification = createAsyncThunk(
  'user/readNotification',
  async (params) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/notifications/${params}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);
export const readAllNotifications = createAsyncThunk(
  'user/readAllNotifications',
  async (params) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/notifications/mark-read-all?to=${params}`
      );
      return response.data?.reverse();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);
export const deleteManyNotifications = createAsyncThunk(
  'user/getNotifications',
  async (params) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/notifications?to=${params}`
      );
      return response.data?.reverse();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const getServices = createAsyncThunk(
  'user/getServices',
  async (params) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/user/service`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (params) => {
    try {
      const response = await axiosInstance.patch(
        `${process.env.REACT_APP_API_URL}/user/${params.id}`,
        { services: params.services }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    friends: [],
    notifications: [],
    services: [],
    servicesMenu: [],
    totalFriends: [],
  },
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload;
    },
    [getServices.fulfilled]: (state, action) => {
      state.services = action.payload?.services;
      let arr = [];
      action.payload?.services?.map((service) => {
        arr.push({
          value: service.service,
          label: service.service,
        });
      });
      state.servicesMenu = arr;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload?.user;
    },
    [allFriends.fulfilled]: (state, action) => {
      state.totalFriends = action.payload;
    },
  },
});

export const selectUser = ({ user }) => user?.user;
export const selectNotifications = ({ user }) => user?.notifications;
export const selectServices = ({ user }) => user?.servicesMenu;
export const selectUserServices = ({ user }) => user?.services;
export const selectTotalFriends = ({ user }) => user?.totalFriends;

export default userSlice.reducer;
