import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Auto } from "../types/autos";

interface AutosState {
    lista: Auto[];
    loading: boolean;
    error: string | undefined;
}


export const getAutos = createAsyncThunk(
    'autos/getAutos',
    async () => {
        const response = await axios.get(
            "https://rickandmortyapi.com/api/character/?count=20"
        );
        return response.data.results;

    }
);

const initialState: AutosState  = {
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