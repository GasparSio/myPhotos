import React from 'react';
import Header from "../components/Header";
import Footer from "./Footer";
import Button from '@mui/material/Button';
import '../components/Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/search');
    }

    
    return (
    <>
      <Header/>
      <main className='main-container'>
        <div className='home-container'>
          <h1>
            myPhotos App
          </h1>
          <p>In this website you will be able to search for any kind of pictures, save it in myFavs Section, and download them in high quality</p>
          <Button variant="contained" className='button-search' onClick={handleClick}>
              Start searching
          </Button>
        </div>
      </main>
      <Footer/>
    </>
    );
  }