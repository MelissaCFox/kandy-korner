//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./ProductList.css"

export const PurchaseProductList = (props) => {
    const [products, updateProduct] = useState([])
    const [productLocationObjects, updateProductLocationObjects] = useState([])
    const [locations, updateLocations] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/products")
                .then(res => res.json())
                .then((data) => {
                    updateProduct(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then((data) => {
                    updateLocations(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/productLocations?locationId=${parseInt(localStorage.getItem("kandy_location"))}`)
                .then(res => res.json())
                .then((data) => {
                    updateProductLocationObjects(data)
                })
        },
        []
    )


    const purchaseProduct = (event) => {
        event.preventDefault()
        const newPurchase = {
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            productLocationId: parseInt(event.target.value),
            datePurchased: new Date().toLocaleDateString()
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        }

        return fetch("http://localhost:8088/purchases", fetchOption)
            .then(() => {
                history.push("/purchases")
            })
    }

    if (localStorage.getItem("kandy_location")) {
        const foundLocation = locations.find(
            (location) => {
                return location.id === parseInt(localStorage.getItem("kandy_location"))
            }
        )

        if (foundLocation) {
            return <>
                <h2>You Are Currently Shopping at the <em>{foundLocation.city}</em> Location</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="location">Location:  </label>
                        <select onChange={(event) => {
                            localStorage.setItem("kandy_location", parseInt(event.target.value))
                            history.push("/products/order")
                            fetch(`http://localhost:8088/productLocations?locationId=${parseInt(localStorage.getItem("kandy_location"))}`)
                                .then(res => res.json())
                                .then((data) => {
                                    updateProductLocationObjects(data)
                                })
                        }}>
                            <option key={`location--0`} value={`0`}>Select a different location</option>
                            {locations.map(
                                (location) => {
                                    return <option key={`location--${location.id}`} value={location.id}>{location.city}</option>
                                }
                            )}

                        </select>
                    </div>
                </fieldset>
                {
                    productLocationObjects.map(
                        (productLocationObj) => {
                            const foundProduct = products.find((product) => product.id === productLocationObj.productId)
                            if (foundProduct) {

                                return <div key={`productLocation--${productLocationObj.id}`}>
                                    <h3>{foundProduct.name}</h3>
                                    <p>Price: ${foundProduct.price}</p>
                                    <button className="btn btn-primary" value={productLocationObj.id} onClick={purchaseProduct}>Purchase</button>
                                </div>

                            }
                        }
                    )
                }
            </>
        } else {
            return <>
                <h1>Please Select a Location First</h1>
            </>
        }
    }
}



