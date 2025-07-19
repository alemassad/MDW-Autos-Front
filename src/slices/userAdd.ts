import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/user";
import api from "../config/axios";

interface UserAddState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const addUser = createAsyncThunk(
  "userAdd/addUser",
  async (user: Omit<User, "_id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/users", user);
      return response.data.data;
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: { data?: { message?: string } };
      };
      const msg =
        errorResponse.response?.data?.message ||
        (error as Error).message ||
        "Error al agrtegar usuario";
      return rejectWithValue(msg);
    }
  }
);
const initialState: UserAddState = {
  user: null,
  loading: false,
  error: null,
};

const userAddSlice = createSlice({
  name: "userAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload as string || "Error desconocido";
      });
  },
});

export const userAddReducer = userAddSlice.reducer;
export default userAddReducer;
