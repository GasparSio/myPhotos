import React from 'react';
import './App.css';

//Import Components
import Home from "./components/Home";
import Search from "./components/Search";
import MyFavs from "./components/MyFavs";

//Import Route tools
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={ <Home/> }/>
    <Route path="/myPhotos" element={ <Home/> }/>
    <Route path="/home" element={ <Home/> }/>
    <Route path="/search" element={ <Search/> }/>
    <Route path="/myfavs" element={ <MyFavs/> }/>
  </>
))


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
