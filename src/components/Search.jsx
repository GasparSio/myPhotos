import React from 'react';
import Header from "../components/Header";
import Footer from "./Footer";
import SearchBar from './InputSearch';
import '../components/Search.css';
const Search = () => {

    return (
        <>
        <Header />
        <SearchBar />
        <main className='search-container'>
            <p>Search without entering a parameter and a list of random images will be displayed</p>
            <div>

            </div>
        </main>
        <Footer />
        </>
        
    )
}
export default Search;
