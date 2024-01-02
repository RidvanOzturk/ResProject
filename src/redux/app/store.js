import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

import UserSlice from "../features/UserSlice";

const reducers = combineReducers({
    UserSlice
});

const persistConfig = {
    key: "root",
    timeout: 100,
    storage,
    whitelist: ["UserSlice"]
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: () => [thunk]
})

export default store;