import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { peopleDataApi } from './ApiSlice';

const rootReducer = combineReducers({
  [peopleDataApi.reducerPath]: peopleDataApi.reducer,
});

type PreloadedState = Partial<ReturnType<typeof rootReducer>>;

export const setupStore = (preloadedState?: PreloadedState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(peopleDataApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];