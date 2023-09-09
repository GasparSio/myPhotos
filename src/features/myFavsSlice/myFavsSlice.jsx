import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: JSON.parse(localStorage.getItem('favorites')) || [],
  reducers: {
    addToFavorites: (state, action) => {
      const { photo } = action.payload;
      const existingImage = state.find((image) => image.id === photo.id);
      if (!existingImage) {
        const currentTime = new Date().toISOString();
        const imageToAdd = {
          id: photo.id,
          description: photo.description,
          alt_description: photo.alt_description,
          width: photo.width,
          height: photo.height,
          likes: photo.likes,
          urls: {
            small: photo.urls.small,
            thumb: photo.urls.thumb,
            regular: photo.urls.regular,
          },
          timestamp: currentTime,
        };
        state.push(imageToAdd);
        localStorage.setItem('favorites', JSON.stringify(state));
      }
      localStorage.setItem('favorites', JSON.stringify(state));
    },
    removeFromFavorites: (state, action) => {
      const imageId = action.payload;
      const updatedState = state.filter((image) => image.id !== imageId);
      localStorage.setItem('favorites', JSON.stringify(updatedState));
      return updatedState;
    },
    updatePhotoDescription: (state, action) => {
      const { id, description } = action.payload;
      const photoToUpdate = state.find((photo) => photo.id === id);
      if (photoToUpdate) {
        photoToUpdate.description = description;
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites, updatePhotoDescription } = favoritesSlice.actions;

export default favoritesSlice.reducer;