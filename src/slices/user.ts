import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/user";
import api from "../config/axios";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data.data;
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: { data?: { message?: string } };
      };
      const msg =
        errorResponse.response?.data?.message ||
        (error as Error).message ||
        "Error al eliminar usuario";
      return rejectWithValue(msg);
    }
  }
);

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = (action.payload as string) || "Error desconocido";
      });
  },
});

export const { clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userReducer;
