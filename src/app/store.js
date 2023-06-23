import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/searchSlice/searchSlice.jsx';
import favoritesReducer from '../features/myFavsSlice/myFavsSlice.jsx';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoritesReducer,
  },
});
