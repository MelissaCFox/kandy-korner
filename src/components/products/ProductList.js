//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const ProductList = () => {
    const [products, updateProduct] = useState([])
    const [locations, updateLocations] = useState([])
    const history = useHistory()


    useEffect(
        () => {
            fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId")
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




    return <>
        <div className="products__message">
            <h2>Please Select One of Our Locations to Purchase a Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:  </label>
                    <select onChange={(event) => {
                        localStorage.setItem("kandy_location", parseInt(event.target.value))
                        history.push("/order")
                    }}>
                        <option key={`location--0`} value={`0`}>Select a location</option>
                        {locations.map(
                            (location) => {
                                return <option key={`location--${location.id}`} value={location.id}>{location.city}</option>
                            }
                        )}

                    </select>
                </div>
            </fieldset>
            <p>Below is a list of all available products sold by Kandy Korner</p>
            <div className="product__list">
                {
                    products.map(
                        (product) => {
                            return <div key={`product--${product.id}`}>
                                <h3>{product.name}</h3>
                            </div>
                        }
                    )
                }
            </div>



        </div>
    </>
}