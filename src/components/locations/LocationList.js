import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './LocationList.css';

export const LocationList = () => {
    const [locations, updateLocation] = useState([])
    const history = useHistory()

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