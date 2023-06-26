import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Alert, Stack } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { removeFromFavorites } from '../features/myFavsSlice/myFavsSlice';

import Header from "../components/Header";
import Footer from "./Footer";
import '../components/MyFavs.css';

const MyFavs = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const [showAlert, setShowAlert] = useState(false);

    // const handleSearch = () => {
    //     dispatch(searchPhotos(searchQuery));
    // };
    const handleDeleteFromFavorites = (photo) => {
        dispatch(removeFromFavorites(photo));
        setShowAlert(true);
    
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
    };
    
    return (
        <>
        <Header />
        <main className='fav-container'>
            <div className='input-container'>
                <TextField
                label="Search description"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                className='search-Input'
                />
                <Button variant="contained" color="success" className='search-button'>
                Search
                </Button>
            </div>
            <div className='sort-container'>

            </div>    
            <div className='photos-fav-container'>
                {favorites.map((photo) => (
                <div key={photo.id} className='photos-fav-container-img'>
                    <img src={photo.urls.small} alt={photo.alt_description} />
                    <div className='fav-icon'>
                        <DeleteIcon color="success" onClick={() => handleDeleteFromFavorites(photo)}/>
                        <EditIcon color="success"/>
                    </div>
                </div>
                ))}
            </div>
            {(showAlert) && (
            <Stack spacing={2} className='alert-container'>
                <Alert severity="success">Deleted from favorites</Alert>
            </Stack>
      )}
        </main> 
        <Footer />
        </>
        
    )
}
export default MyFavs;
