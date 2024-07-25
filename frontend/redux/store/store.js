import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../state/authSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

let persistConfig = {
	key: "cuCodeConquest",
	version: 1,
	storage,
};
let rootReducer = combineReducers({
	auth: authSlice,
});

let persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
