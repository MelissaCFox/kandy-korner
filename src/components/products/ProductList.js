//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"

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
            <div className="products__message">
                <h2>Please Checkout One of Our Locations to Purchase a Product</h2>
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