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
        <Footer />
        </>
    )
}
export default Search;
