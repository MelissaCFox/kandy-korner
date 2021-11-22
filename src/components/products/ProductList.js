//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./ProductList.css"

export const ProductList = () => {
    //useState hooks declare two new state variables: products and productTypes with their corresponding update components
    const [products, updateProduct] = useState([])
    const [productTypes, updateProductTypes] = useState([])

    //useEffect hook fetches all products from the API, with expanded data associated with the productType foreign key (and sorted by productTypeId) and sets the products state with the data using the updateProduct component
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

    //useEffect hook fetches all product types from the API and sets that array equal to the productTypes state using its update component.
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



    //map through the products state array, find the productType object associated with each product, and display all relevant details in item list.
    // "?" after object variable and before dot notation for key checks that that variable exists before looking for the property (replaces an if statement)
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