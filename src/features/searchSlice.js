import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../helpers/axiosInstance";

export const searchedText = createAsyncThunk(
  "search/searchedText",
  async ({ params, navigate }) => {
    const updatedParams = params ? `?searchedText=${params}` : "";
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/search/group${updatedParams}`
      );
      return data;
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
        console.log("Logout");
      }
      // return null;
    }
  }
);

export const searchByRadius = createAsyncThunk(
  "search/searchByRadius",
  async ({ params, navigate }) => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/search/radius?searchedText=${params.text}&radius=1&lat=${params.coordinates[1]}&long=${params.coordinates[0]}`
      );
      return data;
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
        console.log("Logout");
      }
      // return null;
    }
  }
);

export const searchHistory = createAsyncThunk(
  "search/searchHistory",
  async () => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/user/search`
      );
      return data;
    } catch (err) {
      if (err.response.status === 401) {
        // navigate("/login");
        console.log("Logout");
      }
      // return null;
    }
  }
);

export const deleteSearchHistory = createAsyncThunk(
  "search/deleteSearchHistory",
  async (params) => {
    try {
      const { data } = await axiosInstance.delete(
        `${process.env.REACT_APP_API_URL}/user/search/${params} `
      );
      return data;
    } catch (err) {
      if (err.response.status === 401) {
        // navigate("/login");
        console.log("Logout");
      }
      // return null;
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchData: [],
    searchHistory: [],
  },
  extraReducers: {
    [searchedText.fulfilled]: (state, action) => {
      state.searchData = action.payload;
    },
    [searchByRadius.fulfilled]: (state, action) => {
      state.searchData = { search: action.payload };
    },
    [searchHistory.fulfilled]: (state, action) => {
      state.searchHistory = action.payload ? action.payload.data : [];
    },
    [searchHistory.rejected]: (state, action) => {
      state.searchHistory = [];
    },
  },
});

export const selectSearchData = ({ search }) => search.searchData;
export const selectSearchHistory = ({ search }) => search.searchHistory;

export default searchSlice.reducer;
