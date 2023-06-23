import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPhotos } from '../features/searchSlice/searchSlice';
import { addToFavorites } from '../features/myFavsSlice/myFavsSlice';
import '../components/InputSearch.css';

import { TextField, Modal, Typography, Alert, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';


const SearchBar = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.results);
  const [searchQuery, setSearchQuery] = useState('');
  const favorites = useSelector((state) => state.favorites);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const handleSearch = () => {
    dispatch(searchPhotos(searchQuery));
  };
  const handleToggleFavorite = (photo) => {
    dispatch(addToFavorites(photo.id));
    setShowAlert(true);

    if (isFavorite(photo.id)) {
      setAlertMessage('Deleted from favorite');
    } else {
      setAlertMessage('Added to favorite');
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
  const isFavorite = (photoId) => favorites.includes(photoId);


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
          <div key={photo.id}>
              <img src={photo.urls.small} alt={photo.alt_description} />
              <div onClick={() => handleToggleFavorite(photo)} className='fav-icon'>
                <FavoriteIcon style={{
                    color: isFavorite(photo.id) ? 'red' : 'gray',
                  }}
                />
                {favorites.includes(photo.id) ? 'Agregado a favoritos' : 'Agregar a favoritos'}
              </div>
          </div>
        ))}
      </div>
        {(showAlert) && (
          <Stack spacing={2} className='alert-container'>
            <Alert severity="success">{alertMessage}</Alert>
          </Stack>
      )}
    </div>
  );
};

export default SearchBar;