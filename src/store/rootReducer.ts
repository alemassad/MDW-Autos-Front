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
import { reducer as usersReducer } from "../slices/users";
import { userReducer } from "../slices/user";
import userAddReducer from "../slices/userAdd";
import { userEditReducer } from "../slices/userEdit";
import userDeleteReducer from "../slices/userDelete";
import { categoryReducer } from "../slices/category";

const rootReducer = combineReducers({
  autos: autosReducer,
  auto: autoReducer,
  autoDelete: autoDeleteReducer,
  autoAdd: autoAddReducer,
  autoEdit: autoEditReducer,
  categories: categoriesReducer,
  category: categoryReducer,
  categoryAdd: categoryAddReducer,
  categoryEdit: categoryEditReducer,
  categoryDelete: categoryDeleteReducer,
  users: usersReducer,
  user: userReducer,
  userAdd: userAddReducer,
  userEdit: userEditReducer,
  userDelete: userDeleteReducer,
});

export default rootReducer;