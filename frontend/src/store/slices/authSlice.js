import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios.js";

const storeUser = localStorage.getItem("user");

const initialState = {
  user: storeUser ? JSON.parse(storeUser) : null,
  token: localStorage.getItem("token"),
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({email, password}, { rejectWithValue }) => {
    try {
      const data = await api.post("/auth/login", {email, password});
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
