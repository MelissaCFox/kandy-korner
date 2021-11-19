import React, { useEffect, useState } from "react"

export const Test = () => {

    const [locations, updateLocations] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/locations?_embed=productLocations")
                .then(res => res.json())
                .then((data) => {
                    updateLocations(data)
                })
        },
        []
    )


    return <>
        <h2>Test: Product Location Info</h2>
        {
            locations.forEach(
                (locationObj) => {
                    locationObj.productLocations.map(
                        (productLocationObject) => {

                            return <div key={productLocationObject.id}>
                                ProductId: {productLocationObject.productId}, LocationID: {productLocationObject.locationId}

                            </div>
                        }
                    )

                }
            )

        }

    </>

}

