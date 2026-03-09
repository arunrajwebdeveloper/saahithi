import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import windowReducer from "./features/windowSlice";
import sidebarReducer from "./features/sidebarSlice";
import themeReducer from "./features/themeSlice";
import dashboardReducer from "./features/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    window: windowReducer,
    sidebar: sidebarReducer,
    dashboard: dashboardReducer,
  },
});

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
