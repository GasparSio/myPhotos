// Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Creating an async fetch function
export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",

  async ({ query }) => {
    const API_KEY = "_AyGI0g3hqhZGMOR9EuTZPJpSAl-BjjSya1kssKK2rE4";
    const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${query}&per_page=50`;
    const URL_RANDOM_SEARCH = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=30`;

    // If no search input, I generate a random list of images
    if (query && query !== "") {
      const response = await fetch(URL);
      const data = await response.json();
      return [...data.results];
    } else {
      const response = await fetch(URL_RANDOM_SEARCH);
      const data = await response.json();
      return [...data];
    }
  }
);