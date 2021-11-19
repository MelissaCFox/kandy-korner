import React, { useEffect, useState } from "react"

export const Test = () => {

    const [locations, updateLocations] = useState([])
    const [products, updateProducts] = useState([])

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
    useEffect(
        () => {
            fetch("http://localhost:8088/products")
                .then(res => res.json())
                .then((data) => {
                    updateProducts(data)
                })
        },
        []
    )


    return <>
        <h2>Test: ProductLocation Product Info</h2>

        {
            locations.map(
                (locationObj) => {
                    
                    locationObj.productLocations.map(
                        (productLocationObj) => {
                            const foundProduct = products.find(
                                (product) => {
                                    return product.id === productLocationObj.productId
                                }
                            )
                            debugger
                            if (foundProduct) {
                                return <div key={productLocationObj.id}>
                                    Product Name: {foundProduct.name}

                                </div>
                            } else {
                                return <div>No Product</div>
                            }
                        }
                    )
                }
            )

        }

    </>

}

// {
//     locations.forEach(
//         (locationObj) => {
//             locationObj.productLocations.map(
//                 (productLocationObject) => {

//                     return <div key={productLocationObject.id}>
//                         ProductId: {productLocationObject.productId}, LocationID: {productLocationObject.locationId}

//                     </div>
//                 }
//             )

//         }
//     )

// }