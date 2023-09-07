// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // You'll define your reducers

const store = configureStore({
  reducer: rootReducer,
});

export default store;
