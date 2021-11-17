//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const ProductList = () => {
    const [products, updateProduct] = useState([])
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

    const purchaseProduct = (event) => {
        event.preventDefault()
        const newPurchase = {
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            pproductLocationId: 1,
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


    return (
        <>
            {
                products.map(
                    (product) => {
                        return <div key={`product--${product.id}`}>
                            <h3>{product.name}</h3>
                            <p>Product Type: {product.productType.type}</p>
                            <p>Price: ${product.price}</p>
                            <button className="btn btn-primary" onClick={purchaseProduct}>Purchase</button>
                            </div>
                    }
                )
            }
        </>
    )
}