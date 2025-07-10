import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "../types/category"; 
import api from "../config/axios";

interface CategoriesState {
  lista: Category[];
  category: Category | null;
  loading: boolean;
  error: string | null;
}

export const getCategories = createAsyncThunk("categories/getCategories", async () => {
  const response = await api.get("/categories");
  return response.data.data;
});

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data.data;
    } catch (err) {
      console.log("Error al obtener la categoría:", err);      
      return rejectWithValue(
        err || "Error al obtener la categoría."
      );
    }
  }
);

const initialState: CategoriesState = {
  lista: [],
  category: null,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {

    clearCategory: (state) => {
      state.category = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null; // Limpia cualquier error previo al iniciar la carga
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload; // Asigna los datos obtenidos a la lista
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Asigna el mensaje de error
        state.lista = []; // Opcional: limpia la lista en caso de error
      })

      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.category = null; // Limpiamos la categoría anterior al iniciar una nueva búsqueda
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.category = null; // Limpiamos la categoría en caso de error
      });
  },
});

export const { reducer } = categoriesSlice;
export const { clearCategory } = categoriesSlice.actions;