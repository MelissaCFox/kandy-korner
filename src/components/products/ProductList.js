//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { ApplicationViews } from "../ApplicationViews"
import "./ProductList.css"

export const ProductList = () => {
    const [products, updateProduct] = useState([])


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




    return <>
        <div className="products__page">

            <div className="products__all">
            <p>Below is a list of all available products sold by Kandy Korner</p>
            <div className="product__list">
                {
                    products.map(
                        (product) => {
                            return <div key={`product--${product.id}`}>
                                <div className="product__name">{product.name}</div>
                            </div>
                        }
                    )
                }
            </div>
            </div>
            
            <h3>Please Select One of Our <Link to="/locations">Locations</Link> to Purchase a Product</h3>

        </div>
    </>
}