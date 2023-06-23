import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "AyGI0g3hqhZGMOR9EuTZPJpSAl-BjjSya1kssKK2rE4";

// Creating an async fetch function
export const searchPhotos = createAsyncThunk(
  'search/searchPhotos', 
  async (query) => {
  try {
    let url = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=30`;

    if (query) {
      url = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${query}&per_page=30`;
    }
    const response = await fetch(url);
    const data = await response.json();
    let results = data;

    if (query) {
      results = data.results;
    }
    return results;
  } catch (error) {
    console.error('Error searching photos:', error);
    throw error;
  }
});

// Checking the status of the promise. When fulfilled: the images array will be populated
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [searchPhotos.pending]: (state) => {
      state.status = 'loading';
    },
    [searchPhotos.fulfilled]: (state, action) => {
      state.results = action.payload;
      state.status = 'succeeded';
    },
    [searchPhotos.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default searchSlice.reducer;
