import { configureStore } from "@reduxjs/toolkit";
import { peopleDataApi } from "./ApiSlice";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    [peopleDataApi.reducerPath]: peopleDataApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleDataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;