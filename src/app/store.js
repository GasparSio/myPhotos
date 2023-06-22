import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/searchSlice/searchSlice.jsx';
// import favsReducer from '../features/searchSlice/searchSlice.jsx';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    // favImages: favsReducer,
  },
});
