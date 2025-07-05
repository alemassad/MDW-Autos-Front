import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";
import type { Auto } from "../types/autos";

interface AutoAddState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export const addAuto = createAsyncThunk(
  "autoAdd/addAuto",
  async (auto: Omit<Auto, "_id">, { rejectWithValue }) => {
    try {
      await api.post("/cars", auto);
      return "Auto agregado correctamente.";
    } catch (err) {
      return rejectWithValue("Error al agregar el auto "+ err);
    }
  }
);

const initialState: AutoAddState = {
  loading: false,
  success: null,
  error: null,
};

const autoAddSlice = createSlice({
  name: "autoAdd",
  initialState,
  reducers: {
    clearAddState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAuto.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(addAuto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(addAuto.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload as string || "Error desconocido";
      });
  },
});

export const { clearAddState } = autoAddSlice.actions;
export const autoAddReducer = autoAddSlice.reducer;
export default autoAddReducer;
