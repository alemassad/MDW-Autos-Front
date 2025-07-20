import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";
import type { Category } from "../types/category";


interface CategoryAddState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export const addCategory = createAsyncThunk(
  "categoryAdd/addCategory",
  async (
    category: Omit<Category, "_id" | "cars">,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/categories", category);
      return response.data.message || "Categoría agregada correctamente.";
    } catch (err: unknown) {
      const errorResponse = err as { response?: { data?: { message?: string } } };
      const msg =
        errorResponse.response?.data?.message || "Error al agregar la categoría.";
      return rejectWithValue(msg);
    }
  }
);

const initialState: CategoryAddState = {
  loading: false,
  success: null,
  error: null,
};

const categoryAddSlice = createSlice({
  name: "categoryAdd",
  initialState,
  reducers: {
    // Reducer para limpiar el estado de la operación de agregar
    clearAddState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Caso pending: la solicitud está en curso
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.success = null; // Limpia mensajes de éxito previos
        state.error = null; // Limpia mensajes de error previos
      })
      // Caso fulfilled: la solicitud se completó con éxito
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload; // Asigna el mensaje de éxito
        state.error = null;
      })
      // Caso rejected: la solicitud falló
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload as string; // Asigna el mensaje de error
      });
  },
});

// Exporta las acciones y el reducer
export const { clearAddState } = categoryAddSlice.actions;
export const categoryAddReducer = categoryAddSlice.reducer;
export default categoryAddReducer;
