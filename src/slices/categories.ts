import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "../types/category";
import api from "../config/axios";

interface CategoriesState {
  lista: Category[];
  category: Category | null;
  loading: boolean;
  error: string | null;
}

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const response = await api.get("/categories");
    return response.data.data;
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data.data as Category;
    } catch (error: unknown) {
      let msg = "Error al obtener la categoría";
      if (typeof error === "object" && error !== null) {
        const errorMessage = error as {
          response?: { data?: { message?: string } };
        };
        msg =
          errorMessage?.response?.data?.message ||
          (error instanceof Error ? error.message : undefined) ||
          msg;
      }
      return rejectWithValue(msg);
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
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.lista = [];
      })

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
        state.category = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Error desconocido";
      });
  },
});

export const { reducer } = categoriesSlice;
export const { clearCategory } = categoriesSlice.actions;
