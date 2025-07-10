// File: src/slices/categoryAdd.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";
import type { Category } from "../types/category";

// Define el estado para la operación de agregar categoría
interface CategoryAddState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

// Thunk asíncrono para agregar una nueva categoría
// Omitimos '_id' y 'cars' ya que no se envían al crear una categoría
export const addCategory = createAsyncThunk(
  "categoryAdd/addCategory",
  async (
    category: Omit<Category, "_id" | "cars">, // Omitimos '_id' y 'cars' ya que no se envían al crear una categoría
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/categories", category);
      // Asumiendo que la API devuelve la categoría creada o un mensaje de éxito
      return response.data.message || "Categoría agregada correctamente.";
    } catch (err) {
      console.log("Error al agregar la categoría:", err);

      return rejectWithValue(err || "Error al agregar la categoría.");
    }
  }
);

const initialState: CategoryAddState = {
  loading: false,
  success: null,
  error: null,
};

// Creación del slice de Redux
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
