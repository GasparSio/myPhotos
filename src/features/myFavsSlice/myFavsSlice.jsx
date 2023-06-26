import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      state.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      return state.filter((image) => image.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const image = state.find((img) => img.id === action.payload);
      if (image) {
        image.selected = !image.selected;
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;