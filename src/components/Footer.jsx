import React from "react";
import { useNavigate } from 'react-router-dom';
import '../components/Footer.css';
import logo from '../images/logoGreen.png';

const Footer = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/home');
    }
    return (
        <div className="footer-container">
            <img src={logo} alt="iconLogo" onClick={handleClick}/>
            <p onClick={handleClick} style={{cursor:'pointer'}}>myPhotos. </p>
            <a 
            href="https://github.com/GasparSio"
            rel="noopener noreferrer"
            target="_blank"
            >
            By Gaspar Sio.
            </a>
        </div>
    )
}
export default Footer;