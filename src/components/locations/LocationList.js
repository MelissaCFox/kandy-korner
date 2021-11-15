import React, { useEffect, useState } from "react"

export const LocationList = () => {
    const [locations, updateLocation] = useState([])

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
            {
                locations.map(
                    (location) => {
                        return <p key={`location--${location.id}`}>Location #{location.id}: {location.address}</p>
                    }
                )
            }
        </>
    )
}