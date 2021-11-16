import React from "react"
import { ApplicationViews } from "./ApplicationViews"
import { LocationList } from "./locations/LocationList"
import { NavBar } from "./nav/NavBar"
import { ProductList } from "./products/ProductList"


export const KandyKorner = () => {
    return (
        <>
        <NavBar />
        <h1>Kandy Korner</h1>
        <ApplicationViews />

        </>

    )
}