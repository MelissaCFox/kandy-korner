import React, { useEffect, useState } from "react"

export const Test = () => {

    //useState hooks declate two new state variables and their corresponding setter componenets
    const [locations, updateLocations] = useState([])
    const [products, updateProducts] = useState([])

    //useEffect hook fetches locations data from API, with each locations object embeded with their own productLocations array and updates locations state using the updateLocations state component
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

    //useEffect hook fetches products data from API and sets it to the products state variable with its setter component
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

    //------This is not currently rendering anything on the page and no errors are showing up in dev tools
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

//-----This didn't work either...

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