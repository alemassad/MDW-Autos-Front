import { combineReducers } from "@reduxjs/toolkit";
import { reducer as autosReducer } from "../slices/autos";

const rootReducer = combineReducers({
    autos: autosReducer,
});

export default rootReducer;