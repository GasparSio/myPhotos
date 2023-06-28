import React from "react";
import '../components/Header.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logoGreen.png';

const Header = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/home');
    }
    return (
        <div className="header-container">
            <div className="icon-container">
                <img src={logo} alt="iconLogo" onClick={handleClick}/>
                <span onClick={handleClick} style={{cursor:'pointer'}}>myPhotos</span>
            </div>
            <div className="links-container">
                <NavLink to="/home" className='nav-link'>Home</NavLink>
                <NavLink to="/search" className='nav-link'>Search</NavLink>
                <NavLink to="/myfavs" className='nav-link'>myFavs</NavLink>
            </div>
        </div>
    )
}
export default Header;