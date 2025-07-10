// File: src/slices/categoryEdit.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";
import type { Category } from "../types/category";

// Define el estado para la operación de edición de categoría
interface CategoryEditState {
  loading: boolean;
  success: string | null;
  error: string | null;
  category: Category | null; // Para almacenar la categoría que se está editando
}

// Thunk asíncrono para obtener una categoría por su ID
export const getCategoryById = createAsyncThunk(
  "categoryEdit/getCategoryById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/categories/${id}`);
      return res.data;
    } catch (err) {
        console.log("Error al buscar la categoría:", err);
        
      return rejectWithValue(err || "Error al buscar la categoría.");
    }
  }
);

// Thunk asíncrono para modificar una categoría existente
export const editCategory = createAsyncThunk(
  "categoryEdit/editCategory",
  async ({ id, data }: { id: string; data: Partial<Omit<Category, '_id' | 'cars'>> }, { rejectWithValue }) => {
    try {
      await api.patch(`/categories/${id}`, data);
      return "Categoría modificada correctamente.";
    } catch (err) {
        console.log("Error al modificar la categoría:", err);
        
      return rejectWithValue(err || "Error al modificar la categoría.");
    }
  }
);

// Estado inicial del slice
const initialState: CategoryEditState = {
  loading: false,
  success: null,
  error: null,
  category: null,
};

// Creación del slice de Redux
const categoryEditSlice = createSlice({
  name: "categoryEdit",
  initialState,
  reducers: {
    // Reducer para limpiar el estado de la operación de edición
    clearEditState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Casos para getCategoryById
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.category = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Error desconocido al buscar la categoría.";
      })
      // Casos para editCategory
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload as string || "Error desconocido al modificar la categoría.";
      });
  },
});

// Exporta las acciones y el reducer
export const { clearEditState } = categoryEditSlice.actions;
export const categoryEditReducer = categoryEditSlice.reducer;
export default categoryEditReducer;
