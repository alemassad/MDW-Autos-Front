import { combineReducers } from "@reduxjs/toolkit";
import { reducer as autosReducer } from "../slices/autos";
import { autoReducer } from "../slices/auto";
import { autoDeleteReducer } from "../slices/autoDelete";
import { autoAddReducer } from "../slices/autoAdd";
import { autoEditReducer } from "../slices/autoEdit";
import { reducer as categoriesReducer } from "../slices/categories";
import categoryAddReducer from "../slices/categoryAdd";
import categoryEditReducer from "../slices/categoryEdit";
import categoryDeleteReducer from "../slices/categoryDelete";

const rootReducer = combineReducers({
  autos: autosReducer,
  auto: autoReducer,
  autoDelete: autoDeleteReducer,
  autoAdd: autoAddReducer,
  autoEdit: autoEditReducer,
  categories: categoriesReducer,
  categoryAdd: categoryAddReducer,
  categoryEdit: categoryEditReducer,
  categoryDelete: categoryDeleteReducer,
});

export default rootReducer;