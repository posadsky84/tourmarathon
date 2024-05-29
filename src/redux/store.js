import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {testReducer} from "./testReducer";
import { api } from './baseApi';

export const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      test: testReducer
    },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
