import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js';
import { use } from "react";

const store = configureStore({
    reducer:{
        user: userReducer,
    },
});

export default store;