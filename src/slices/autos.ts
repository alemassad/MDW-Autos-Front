import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Auto } from "../types/autos";
import api from "../config/axios";

interface AutosState {
  lista: Auto[];
  loading: boolean;
  error: string | undefined;
}

export const getAutos = createAsyncThunk("autos/getAutos", async () => {
  const response = await api.get("/cars");
  return response.data.data;
});

const initialState: AutosState = {
  lista: [],
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: "autos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAutos.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(getAutos.fulfilled, (state, action) => {
        state.lista = action.payload;
        state.loading = initialState.loading;
      })
      .addCase(getAutos.rejected, (state, action) => {
        state.loading = initialState.loading;
        state.lista = initialState.lista;
        state.error = action.error.message;
      });
  },
});

export const reducer = slice.reducer;
export default reducer;
