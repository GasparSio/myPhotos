import React from "react";
import Header from "../components/Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Home from "./Home";

export default function Root() {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}