import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Alert, Stack, Modal, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { saveAs } from 'file-saver';
import Masonry from 'react-masonry-css';

import Header from "../components/Header";
import Footer from "./Footer";
import { removeFromFavorites, updatePhotoDescription } from '../features/myFavsSlice/myFavsSlice';
import '../components/MyFavs.css';

const MyFavs = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertDescription, setShowAlertDescription] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [modifiedDescription, setModifiedDescription] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');

    const sortedFavorites = [...favorites].sort((a, b) => {
        if (sortOption === 'width') {
            return a.width - b.width; 
        } else if (sortOption === 'height') {
            return a.height - b.height; 
        } else if (sortOption === 'likes') {
            return a.likes - b.likes;
        } else {
            return 0; 
        }
    });
    const filteredFavorites = searchQuery 
        ? sortedFavorites.filter((photo) => photo && photo.alt_description && photo.alt_description.includes(searchQuery))
        : sortedFavorites;

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
            description: selectedPhoto.description,
          })
        );
        setShowAlertDescription(true);
    
        setTimeout(() => {
            setShowAlertDescription(false);
        }, 2000);
        setModalOpen(false);
      };
      const handleDescriptionChange = (e) => {
        setSelectedPhoto((prevPhoto) => ({
          ...prevPhoto,
          description: e.target.value,
        }));
      };
      
      const handleSortOptionChange = (event) => {
        setSortOption(event.target.value); 
      };
      const downloadFav = (url, id) => {
        saveAs(url, `${id}.jpeg`);
      };
      return (
        <>
            <Header />
            <main className='fav-container'>
                <div className='input-container'>
                    <TextField
                        label="Search description"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        variant="filled"
                        className='search-input-fav'
                        sx={{
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderWidth: '1px', 
                              borderColor: 'transparent', 
                            }
                          }}
                          InputLabelProps={{
                            style: {
                              color: 'black', 
                            }
                          }}
                    />
                </div>
                <div className='sort-container'>
                    <FormControl className='sort-form'>
                        <InputLabel id="demo-simple-select-label" style={{color:'white'}}>Sort by</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sortOption}
                                label="age"
                                onChange={handleSortOptionChange}
                                style={{color:'white'}}
                            >
                                <MenuItem value="width" style={{color:'#07b96d'}}>Width</MenuItem>
                                <MenuItem value="height" style={{color:'#07b96d'}}>Height</MenuItem>
                                <MenuItem value="Likes" style={{color:'#07b96d'}}>Likes</MenuItem>
                            </Select>
                    </FormControl>
                </div>
                <div className='photos-fav-container'>
                <Masonry
                    breakpointCols={3}
                    className='my-masonry-grid'
                    columnClassName='my-masonry-grid_column'
                >
                        {filteredFavorites.map((photo) => (
                            <div key={photo.id} className='photos-fav-container-img'>
                            <img src={photo.urls.small} alt={photo.alt_description} />
                            <div className='fav-icon'>
                                <EditIcon onClick={() => handleOpenModal(photo)} style={{color:'#0ae98a', cursor:'pointer'}}/>
                                <DeleteIcon onClick={() => handleDeleteFromFavorites(photo.id)} style={{color:'#0ae98a', cursor:'pointer'}}/>
                            </div>
                            </div>
                        ))}
                    </Masonry>
                </div>
                {(showAlert) && (
                    <Stack spacing={2} className='alert-container'>
                        <Alert severity="success">Deleted from favorites</Alert>
                    </Stack>
                )}
                <Modal open={modalOpen} onClose={handleCloseModal}>
                    <div className='modal-container'>
                        {selectedPhoto && (
                            <div className='modal-container__text'>
                                <p>Width: {selectedPhoto.width}</p>
                                <p>Height: {selectedPhoto.height}</p>
                                <p>Likes: {selectedPhoto.likes}</p>
                                <p>Timestamp: {selectedPhoto.timestamp}</p>
                                <p>Description: {selectedPhoto.description}</p>
                                <div className='description-input-container'>
                                    <TextField
                                        className='input-description'
                                        label="Description"
                                        value={selectedPhoto.description || modifiedDescription}
                                        onChange={handleDescriptionChange}
                                    />
                                    <Button variant="contained" onClick={handleUpdateDescription}>
                                        Save
                                    </Button>
                                </div>
                                <span onClick={() => downloadFav(selectedPhoto.urls.regular, selectedPhoto.id)}>
                                    <FileDownloadIcon color='success' />
                                </span>
                            </div>
                        )}
                    </div>
                </Modal>
                {(showAlertDescription) && (
                    <Stack spacing={2} className='alert-container'>
                        <Alert severity="success">Description modified</Alert>
                    </Stack>
                )}
            </main>
            <Footer />
        </>
    )
}
export default MyFavs;
