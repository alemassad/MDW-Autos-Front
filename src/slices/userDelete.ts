import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";

interface UserDeleteState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export const deleteUserById = createAsyncThunk(
  "userDelete/deleteUserById",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return "Usuario eliminado correctamente.";
    } catch (err) {
      return rejectWithValue("Error al eliminar el usuario "+ err);
    }
  }
);

const initialState: UserDeleteState = {
  loading: false,
  success: null,
  error: null,
};

const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState,
  reducers: {
    clearDeleteState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = (action.payload as string) || "Error desconocido";
      });
  },
});

export const { clearDeleteState } = userDeleteSlice.actions;
export const userDeleteReducer = userDeleteSlice.reducer;
export default userDeleteReducer;
