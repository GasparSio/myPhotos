import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      const photoId = action.payload.id;
      if (!state.includes(photoId)) {
        state.push(photoId);
      }
    },
    removeFromFavorites: (state, action) => {
      const photoId = action.payload.id;
      const index = state.findIndex((id) => id === photoId);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;