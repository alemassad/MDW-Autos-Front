import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";

interface CategoryDeleteState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export const deleteCategoryById = createAsyncThunk(
  "categoryDelete/deleteCategoryById",
  async (
    { id, isLogical }: { id: string; isLogical: boolean },
    { rejectWithValue }
  ) => {
    try {
      if (isLogical) {
        await api.patch(`/categories/logical-delete/${id}`);
        return "Categoría dada de baja correctamente (baja lógica).";
      } else {
        await api.delete(`/categories/${id}`);
        return "Categoría eliminada permanentemente (baja física).";
      }
    } catch (err) {
      return rejectWithValue("Error al procesar la solicitud: " + err);
    }
  }
);

const initialState: CategoryDeleteState = {
  loading: false,
  success: null,
  error: null,
};

const categoryDeleteSlice = createSlice({
  name: "categoryDelete",
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
      .addCase(deleteCategoryById.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = (action.payload as string) || "Error desconocido";
      });
  },
});

export const { clearDeleteState } = categoryDeleteSlice.actions;
export const categoryDeleteReducer = categoryDeleteSlice.reducer;
export default categoryDeleteReducer;
