import { combineReducers } from "@reduxjs/toolkit";
import { reducer as autosReducer } from "../slices/autos";
import { autoReducer } from "../slices/auto";
import { autoDeleteReducer } from "../slices/autoDelete";
import { autoAddReducer } from "../slices/autoAdd";
import { autoEditReducer } from "../slices/autoEdit";

const rootReducer = combineReducers({
    autos: autosReducer,
    auto: autoReducer,
    autoDelete: autoDeleteReducer,
    autoAdd: autoAddReducer,
    autoEdit: autoEditReducer,
});

export default rootReducer;