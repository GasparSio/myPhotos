import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPhotos } from '../features/searchSlice/searchSlice';
import { addToFavorites } from '../features/myFavsSlice/myFavsSlice';
import '../components/InputSearch.css';
import Masonry from 'react-masonry-css';


import { TextField, Alert, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.results);
  const [searchQuery, setSearchQuery] = useState('');
  const favorites = useSelector((state) => state.favorites);
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = () => {
    dispatch(searchPhotos(searchQuery));
  };
  const handleAddToFavorites = (photo) => {
    const existingImage = favorites.find((image) => image.id === photo.id);
    if (!existingImage) {
      dispatch(addToFavorites({ photo }));
      setShowAlert(true);
  
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    }
  };

  return (
    <div className='search-bar-container'>
      <div className='search-input-container'>
        <TextField
          label="Start searching"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          className='search-input'
        >
        </TextField>
          <Button variant="contained" onClick={handleSearch} className='search-button'>
            Search
          </Button>

      </div>
      <div className='search-p-container'>
        <p>Search without entering a parameter and a list of random images will be displayed</p>
      </div>
      <div className='photos-container'>
        <Masonry
            breakpointCols={3}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'
        >
            {searchResults.map((photo) => (
              <div key={photo.id} className='photos-container-img'>
                <div className='image-container'>
                  <img src={photo.urls.small} alt={photo.alt_description} />
                  <div onClick={() => handleAddToFavorites(photo)} className='fav-icon'>
                    <FavoriteIcon
                      style={{
                        cursor: 'pointer',
                        color: favorites.find((image) => image.id === photo.id) ? '#07b96d  ' : 'gray'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </Masonry>
      </div>
        {(showAlert) && (
          <Stack spacing={2} className='alert-container'>
            <Alert severity="success">Added to favorite</Alert>
          </Stack>
      )}
    </div>
  );
};

export default SearchBar;