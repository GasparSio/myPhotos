import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPhotos } from '../features/searchSlice/searchSlice';

import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import '../components/InputSearch.css';


const SearchBar = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.results);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    dispatch(searchPhotos(searchQuery));
  };

  return (
    <div className='search-bar-container'>
      <div className='input-container'>
        <TextField
          label="Start searching"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          className='search-Input'
        />
        <Button variant="contained" color="success" onClick={handleSearch} className='search-button'>
          Search
        </Button>
      </div>
      <div className='search-p-container'>
        <p>Search without entering a parameter and a list of random images will be displayed</p>
      </div>
      <div className='photos-container'>
        {searchResults.map((photo) => (
          <img key={photo.id} src={photo.urls.small} alt={photo.alt_description} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;