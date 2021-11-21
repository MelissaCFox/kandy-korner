import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './LocationList.css';

export const LocationList = () => {
    
    //useState hook declares a new locations state and an updateLocation component to manage locations state
    const [locations, updateLocation] = useState([])
    //setting useHistory hook equal to a variable allows us to push the user to a different route with variable.push("/route")
    const history = useHistory()

    //useEffect hook fetches locations data from API and update state with updateLocation component declared in useState
    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then((data) => {
                    updateLocation(data)
                })
        },
        []
    )

    //onClick event handler in "shop at this location button" sets local storage info and pushes user to the "/products/order" route
    return (
        <>
            <h2 className="locations-heading">Locations</h2>
            <div className="locations-list">
            {
                locations.map(
                    (location) => {
                        return <div className="location-item"key={`location--${location.id}`}>
                            
                            <h3 className="location__city">{location.city}</h3>
                            <section className="location__address">{location.address}</section>
                            <div className="button-div">
                            <button className="location-button" value={location.id} onClick={() => {
                                localStorage.setItem("kandy_location", parseInt(location.id))
                                history.push("/products/order")
                                }}>Shop at This Location</button></div>
                        
                        </div>
                    }
                )
            }
            </div>
        </>
    )
}