import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";
import type { User } from "../types/user";

interface UserEditState {
  loading: boolean;
  success: string | null;
  error: string | null;
  user: User | null;
}

export const getUserById = createAsyncThunk(
  "userEdit/getUserById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/${id}`);
      return res.data.data;
    } catch (error: unknown) {
      const err = error as { message?: string };
      return rejectWithValue(err.message || "Error al obtener el usuario");
    }
  }
);

export const editUser = createAsyncThunk(
  "userEdit/editUser",
  async ({ id, data }: { id: string; data: Partial<Omit<User, '_id'>> }, { rejectWithValue }) => {
    try {
      await api.patch(`/users/${id}`, data);
      return "Usuario modificado correctamente.";
   } catch (error: unknown) {
      const errorResponse = error as { response?: { data?: { message?: string } } };
      const msg =
        errorResponse.response?.data?.message ||
        (error as Error).message ||
        "Error al eliminar usuario";
      return rejectWithValue(msg);
    }
  }
);
const initialState: UserEditState = {
  loading: false,
  success: null,
  error: null,
  user: null,
};

const userEditSlice = createSlice({
  name: "userEdit",
  initialState,
  reducers: {
    clearEditState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
      state.user = null;
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
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error desconocido";
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = (action.payload as string) || "Error desconocido";
      });
  },
});

export const { clearEditState } = userEditSlice.actions;
export const userEditReducer = userEditSlice.reducer;
