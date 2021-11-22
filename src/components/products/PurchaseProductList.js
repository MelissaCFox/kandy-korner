//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./ProductList.css"

export const PurchaseProductList = (props) => {
    //useState hooks declare three new state variables and their corresponding setter components for managing the state
    const [productLocationObjects, updateProductLocationObjects] = useState([])
    const [locations, updateLocations] = useState([])

    //useHistory() is a React hook that navigates to a specific Route using "the state variable".push("the routh path")
    const history = useHistory()

    //useEffect hook fetches all locations from API and updates the locations state array with that data using its setter component
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

    //useEffect hook fetches all productLocations that have a locationId equal to the value of the local storage item "kandy_location" and updates the productLocationObjects state array with that data using its setter component
    useEffect(
        () => {
            fetch(`http://localhost:8088/productLocations?locationId=${parseInt(localStorage.getItem("kandy_location"))}&_expand=product`)
                .then(res => res.json())
                .then((data) => {
                    updateProductLocationObjects(data)
                })
        },
        []
    )

    //purchaseProduct component finishes by pushing the user to the purchases component using the useHistory hook declared above
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

        return <>
            <div className="purchase-products">
                <div className="location-info">
                    <h2>You Are Currently Shopping at the <em>{foundLocation?.city}</em> Location</h2>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="location">Location:  </label>
                            <select onChange={(event) => {
                                localStorage.setItem("kandy_location", parseInt(event.target.value))
                                fetch(`http://localhost:8088/productLocations?locationId=${parseInt(localStorage.getItem("kandy_location"))}&_expand=product`)
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
                </div>
                <div className="productLocations--list">
                    {
                        productLocationObjects.map(
                            (productLocationObj) => {

                                //Extra Goal to Work On - find product type for each product and apply it as a className to the div that can be used to style the background color differently.

                                return <div className="productLocations--item" key={`productLocation--${productLocationObj.id}`}>
                                    <h3>{productLocationObj.product.name}</h3>
                                    <p>Price: ${productLocationObj.product.price}</p>
                                    <button className="btn btn-primary" value={productLocationObj.id} onClick={purchaseProduct}>Purchase</button>
                                </div>
                            }
                        )
                    }
                </div>
            </div>
        </>

    } else {
        return <><h1>Please Select a Location First</h1></>
    }
}



