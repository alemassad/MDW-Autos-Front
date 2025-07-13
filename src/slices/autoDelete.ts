import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";

interface AutoDeleteState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export const deleteAutoById = createAsyncThunk(
  "autoDelete/deleteAutoById",
  async (
    { id, isLogical }: { id: string; isLogical: boolean },
    { rejectWithValue }
  ) => {
    try {
      if (isLogical) {
        await api.patch(`/cars/logical-delete/${id}`);
        return "Auto dado de baja correctamente (baja lógica).";
      } else {
        await api.delete(`/cars/${id}`);
        return "Auto eliminado permanentemente (baja física).";
      }
    } catch (err) {
      return rejectWithValue("Error al procesar la solicitud: " + err);
    }
  }
);

const initialState: AutoDeleteState = {
  loading: false,
  success: null,
  error: null,
};

const autoDeleteSlice = createSlice({
  name: "autoDelete",
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
      .addCase(deleteAutoById.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(deleteAutoById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(deleteAutoById.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload as string || "Error desconocido";
      });
  },
});

export const { clearDeleteState } = autoDeleteSlice.actions;
export const autoDeleteReducer = autoDeleteSlice.reducer;
export default autoDeleteReducer;
