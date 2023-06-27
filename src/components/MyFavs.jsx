import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Alert, Stack, Modal } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Header from "../components/Header";
import Footer from "./Footer";
import { removeFromFavorites, updatePhotoDescription } from '../features/myFavsSlice/myFavsSlice';
import '../components/MyFavs.css';

const MyFavs = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const [showAlert, setShowAlert] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [modifiedDescription, setModifiedDescription] = useState('');


    const handleDeleteFromFavorites = (photo) => {
        dispatch(removeFromFavorites(photo));
        setShowAlert(true);
    
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
    };
    const handleOpenModal = (photo) => {
        setSelectedPhoto(photo);
        setModifiedDescription(photo.description);
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleUpdateDescription = () => {
        dispatch(
          updatePhotoDescription({
            id: selectedPhoto.id,
            description: modifiedDescription,
          })
        );
      };
      
    const handleDownloadImage = () => {
        // Descargar la imagen de la foto seleccionada
        if (selectedPhoto) {
            const link = document.createElement('a');
            link.href = selectedPhoto.urls.small;
            link.download = 'image.jpg';
            link.click();
        }
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
                        <DeleteIcon color="success" onClick={() => handleDeleteFromFavorites(photo.id)}/>
                        <EditIcon color="success" onClick={() => handleOpenModal(photo)}/>
                    </div>
                </div>
                ))}
            </div>
            {(showAlert) && (
            <Stack spacing={2} className='alert-container'>
                <Alert severity="success">Deleted from favorites</Alert>
            </Stack>
            )}
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <div className='modal-container'>
                    {selectedPhoto && (
                    <div>
                        <p>Width: {selectedPhoto.width}</p>
                        <p>Height: {selectedPhoto.height}</p>
                        <p>Likes: {selectedPhoto.likes}</p>
                        <p>Timestamp: {selectedPhoto.timestamp}</p>
                        <p>Description: {selectedPhoto.description}</p>
                        <div className='description-input-container'>
                            <TextField
                                className='input-description'
                                label="Description"
                                value={modifiedDescription}
                                onChange={(e) => setModifiedDescription(e.target.value)}
                            />
                            <Button variant="contained" color="success" onClick={handleUpdateDescription}>
                                Save
                            </Button>
                        </div>
                        <FileDownloadIcon color="success" onClick={handleDownloadImage}>
                            Download Image
                        </FileDownloadIcon>
                    </div>
                    )}
                </div>
            </Modal>
        </main> 
        <Footer />
        </>
        
    )
}
export default MyFavs;
