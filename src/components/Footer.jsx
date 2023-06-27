import React from "react";
import { useNavigate } from 'react-router-dom';
import '../components/Footer.css';

const Footer = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/home');
    }
    return (
        <div className="footer-container">
            <img src="../../logoGreen.png" alt="iconLogo" onClick={handleClick}/>
            <p>myPhotos. </p>
            <a 
            href="https://github.com/GasparSio"
            target="_blank"
            >
            By Gaspar Sio.
            </a>
        </div>
    )
}
export default Footer;