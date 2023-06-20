import React from 'react';
import { TextField } from '@mui/material';
import { IconButton, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import '../components/InputSearch.css';


const SearchBar = () => {

  const handleSearch = () => {
    // Lógica de búsqueda aquí
  };

  return (
    <div className='search-container'>
      <IconButton className='search-icon-container' color="primary" onClick={handleSearch}>
        <SearchIcon className='search-icon'/>
      </IconButton>
      <TextField label="Search" variant="standard" className='search-Input'/>
      <Button variant="contained" color="success" onClick={handleSearch} className='search-button'>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;