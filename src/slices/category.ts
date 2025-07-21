import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Category } from "../types/category";
import api from "../config/axios";

interface CategoryState {
  category: Category | null;
  loading: boolean;
  error: string | null;
}

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data.data as Category;
    } catch (error: unknown) {
      const errorMessage = error as { response?: { data?: { message?: string } } };  
      const msg =
        errorMessage?.response?.data?.message ||
        (error as Error).message ||
        "Error al obtener la categoría";
      return rejectWithValue(msg);
    }
  }
);

const initialState: CategoryState = {
  category: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategory: (state) => {
      state.category = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.category = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.category = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Error desconocido";
      });
  },
});

export const { clearCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
export default categoryReducer;