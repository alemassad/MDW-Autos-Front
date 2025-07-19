import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";

interface UserDeleteState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export const deleteUserById = createAsyncThunk(
  "userDelete/deleteUserById",
  async (
    { id, isLogical }: { id: string; isLogical: boolean },
    { rejectWithValue }
  ) => {
    try {
      if (isLogical) {
        await api.patch(`/users/logical-delete/${id}`);
        return "Usuario dado de baja correctamente (baja lógica).";
      } else {
        await api.delete(`/users/${id}`);
        return "Usuario eliminado permanentemente (baja física).";
      }
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
