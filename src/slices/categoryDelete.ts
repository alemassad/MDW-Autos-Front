// File: src/slices/categoryDelete.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";

// Define el estado para la operación de eliminación de categoría
interface CategoryDeleteState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

// Thunk asíncrono para eliminar una categoría por su ID
export const deleteCategoryById = createAsyncThunk(
  "categoryDelete/deleteCategoryById",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${id}`);
      return `Categoría con ID ${id} eliminada correctamente.`;
    } catch (err) {
        console.log("Error al eliminar la categoría:", err);
        
      return rejectWithValue(err || "Error al eliminar la categoría.");
    }
  }
);

// Estado inicial del slice
const initialState: CategoryDeleteState = {
  loading: false,
  success: null,
  error: null,
};

// Creación del slice de Redux
const categoryDeleteSlice = createSlice({
  name: "categoryDelete",
  initialState,
  reducers: {
    // Reducer para limpiar el estado de la operación de eliminación
    clearDeleteState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Caso pending: la solicitud está en curso
      .addCase(deleteCategoryById.pending, (state) => {
        state.loading = true;
        state.success = null; // Limpia mensajes de éxito previos
        state.error = null; // Limpia mensajes de error previos
      })
      // Caso fulfilled: la solicitud se completó con éxito
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload; // Asigna el mensaje de éxito
        state.error = null;
      })
      // Caso rejected: la solicitud falló
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload as string; // Asigna el mensaje de error
      });
  },
});

// Exporta las acciones y el reducer
export const { clearDeleteState } = categoryDeleteSlice.actions;
export const categoryDeleteReducer = categoryDeleteSlice.reducer;
export default categoryDeleteReducer;
