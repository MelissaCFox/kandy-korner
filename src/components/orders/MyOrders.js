//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"
import "./MyOrders.css"

export const MyOrders = () => {
    //useState hooks declare two new state variables: purcahses and products (both arrays) and their corresponding update components
    const [purchases, updatePurchases] = useState([])
    const [products, updateProducts] = useState([])
    //useState hook declares a new currentCustomer state variable (an object) and it's corresponding update component
    const [currentCustomer, changeCurrentCustomer] = useState({})

    //useEffect hook fetches purchases specifically associated with the customerId of the value stored in local storage ("kandy_customer"), with expanded productLocation data, then updates the purchases state as that array.
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
    
    //useEffect hook fetches all products and updates the products state with that array using the updateProducts component
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

    //useEffect hook fetches the customer object with an id equal to the value stored in local storage ("kandy_customer"), and updates the currentCustomer state as that object (using the chagneCurrentCustomer state component)
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

    //check length of the purchases state (an array). As long as it's not empty (length > 0), map through purchases and find the product object associated with each purchase (productLocation object) to display product details for each list element. If the purchases array is empty, display an alternate "No Recent Orders" message.

    //*** Same question as from EmployeeForm.js about restrictions on what methods/functions you can perform within a return statement (mapping is totally fine obviously, anything else?)
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
