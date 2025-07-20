import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Auto } from "../types/autos";
import api from "../config/axios";

interface AutoState {
  auto: Auto | null;
  loading: boolean;
  error: string | null;
}

export const getAutoById = createAsyncThunk(
  "auto/getAutoById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data.data;
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: { data?: { message?: string } };
      };
      const msg =
        errorResponse.response?.data?.message ||
        (error as Error).message ||
        "Error al obtener el auto";
      return rejectWithValue(msg);
    }
  }
);

const initialState: AutoState = {
  auto: null,
  loading: false,
  error: null,
};

const autoSlice = createSlice({
  name: "auto",
  initialState,
  reducers: {
    clearAuto: (state) => {
      state.auto = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAutoById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.auto = null;
      })
      .addCase(getAutoById.fulfilled, (state, action) => {
        state.auto = action.payload;
        state.loading = false;
      })
      .addCase(getAutoById.rejected, (state, action) => {
        state.loading = false;
        state.auto = null;
        state.error = (action.payload as string) || "Error desconocido";
      });
  },
});

export const { clearAuto } = autoSlice.actions;
export const autoReducer = autoSlice.reducer;
export default autoReducer;
