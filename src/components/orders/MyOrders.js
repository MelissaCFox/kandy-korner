//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"
import "./MyOrders.css"

export const MyOrders = () => {
    const [purchases, updatePurchases] = useState([])
    const [products, updateProducts] = useState([])
    const [currentCustomer, changeCurrentCustomer] = useState({})


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
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers/${parseInt(localStorage.getItem("kandy_customer"))}`)
                .then(res => res.json())
                .then((data) => {
                    changeCurrentCustomer(data)
                })

        },
        []
    )

    if (purchases.length > 0) {
        return (
            <>
                <h2 className="heading">Orders For {currentCustomer.name}</h2>
                <div className="customer-list">

                    {
                        purchases.map(
                            (purchase) => {
                                const foundProduct = products.find(
                                    (product) => product.id === purchase.productLocation.productId
                                )
                                return <div className="purchase__item" key={`purchase--${purchase.id}`}>
                                    <h3>Purchase # {purchase.id}</h3>
                                    <section className="purchase__productName">Product Name: {foundProduct?.name}</section>
                                    <section className="purchase__productPrice">Price: ${foundProduct?.price}</section>
                                </div>

                            }
                        )
                    }
                </div>
            </>
        )

    } else {
        return <>
            <h2 className="heading">Orders For {currentCustomer.name}</h2>
            <div className="heading">No Recent Orders</div>
        </>
    }
}
