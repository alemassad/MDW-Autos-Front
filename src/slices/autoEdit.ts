import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";
import type { Auto } from "../types/autos";

interface AutoEditState {
  loading: boolean;
  success: string | null;
  error: string | null;
  auto: Auto | null;
}

export const getAutoById = createAsyncThunk(
  "autoEdit/getAutoById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/cars/${id}`);
      return res.data.data; 
     } catch (error: unknown) {
      const errorResponse = error as { response?: { data?: { message?: string } } };
      const msg =
        errorResponse.response?.data?.message ||
        (error as Error).message ||
        "Error al obtener el auto";
      return rejectWithValue(msg);
    }
  }
);

export const editAuto = createAsyncThunk(
  "autoEdit/editAuto",
  async ({ id, data }: { id: string; data: Partial<Omit<Auto, '_id'>> }, { rejectWithValue }) => {
    try {
      await api.patch(`/cars/${id}`, data);
      return "Auto modificado correctamente.";
     } catch (error: unknown) {
      const errorResponse = error as { response?: { data?: { message?: string } } };
      const msg =
        errorResponse.response?.data?.message ||
        (error as Error).message ||
        "Error al modificar el auto";
      return rejectWithValue(msg);
    }
  }
);

const initialState: AutoEditState = {
  loading: false,
  success: null,
  error: null,
  auto: null,
};

const autoEditSlice = createSlice({
  name: "autoEdit",
  initialState,
  reducers: {
    clearEditState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
      state.auto = null;
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
        state.loading = false;
        state.auto = action.payload;
      })
      .addCase(getAutoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Error desconocido";
      })
      .addCase(editAuto.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(editAuto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(editAuto.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload as string || "Error desconocido";
      });
  },
});

export const { clearEditState } = autoEditSlice.actions;
export const autoEditReducer = autoEditSlice.reducer;
