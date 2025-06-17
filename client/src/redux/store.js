import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./reducers/loaderReducer";

const store = configureStore({
    reducer: { loader: loaderReducer },
});

export default store;
