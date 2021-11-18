//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"

export const MyOrders = () => {
    const [purchases, updatePurchases] = useState([])
    const [products, updateProducts] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=productLocation&customerId=${parseInt(localStorage.getItem("kandy_customer"))}`)
                .then(res => res.json())
                .then((data) => {
                    updatePurchases(data)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(res => res.json())
                .then((data) => {
                    updateProducts(data)
                })
        },
        [])


    return (
        <>
            {

                purchases.map(
                    (purchase) => {
                        const foundProduct = products.find(
                            (product) => product.id === purchase.productLocation.productId
                        )
                        if (foundProduct) {
                
                            return <div key={`purchase--${purchase.id}`}>
                                <h3>Purchase ID # {purchase.id}</h3>
                                <section className="purchase__productName">Product Name: {foundProduct.name}</section>
                                <section className="purchase__productPrice">Price: ${foundProduct.price}</section>
                            </div>
                        }

                    }
                )
            }
        </>
    )
}
