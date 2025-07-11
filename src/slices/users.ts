import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/user";
import api from "../config/axios";

interface UsersState {
  lista: User[];
  loading: boolean;
  error: string | undefined;
}

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await api.get("/users");
  return response.data.data;
});

const initialState: UsersState = {
  lista: [],
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.lista = action.payload;
        state.loading = initialState.loading;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = initialState.loading;
        state.lista = initialState.lista;
        state.error = action.error.message;
      });
  },
});

export const reducer = slice.reducer;
export default reducer;
