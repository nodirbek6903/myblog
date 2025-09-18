import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

// 🔹 Login qilish uchun async thunk
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });

      // Faqat tokenni saqlaymiz
      localStorage.setItem("token", response.data.token);

      return response.data; // { _id, username, token }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login qilishda xatolik"
      );
    }
  }
);

const initialState = {
  admin: null, // faqat state ichida saqlanadi
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = {
          _id: action.payload._id,
          username: action.payload.username,
        };
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
