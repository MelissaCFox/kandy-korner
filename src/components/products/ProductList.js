//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./ProductList.css"

export const ProductList = () => {
    const [products, updateProduct] = useState([])
    const [productTypes, updateProductTypes] = useState([])


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
            fetch("http://localhost:8088/productTypes")
                .then(res => res.json())
                .then((data) => {
                    updateProductTypes(data)
                })
        },
        []
    )




    return <>
        <div className="products__page">

            <div className="products__all">
            <p className="heading">Below is a list of all available products sold by Kandy Korner</p>
            <div className="product__list">
                {
                    products.map(
                        (product) => {
                            const foundProductType = productTypes.find((productType) => productType.id === product.productTypeId)
                            
                            return <div key={`product--${product.id}`}>
                                <div className="product__name">{product.name}
                                <div className="product__type">({foundProductType?.type})</div>
                                </div>
                            </div>
                        }
                    )
                }
            </div>
            </div>
            
            <h3 className="heading">Please Select One of Our <Link to="/locations">Locations</Link> to Purchase a Product</h3>

        </div>
    </>
}