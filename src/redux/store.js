import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import aboutReducer from "./aboutSlice"
import messageReducer from "./messageSlice"
import portfolioReducer from "./portfolioSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    about: aboutReducer,
    messages: messageReducer,
    portfolio: portfolioReducer
  },
});
