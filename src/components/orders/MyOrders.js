//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"
import { fetchAllProducts, fetchCurrentCustomer, fetchPurchasesofCurrentUser } from "../APIManager"
import "./MyOrders.css"

export const MyOrders = () => {
    //useState hooks declare new state variables: purchases and products (both arrays) and their corresponding update components
    const [purchases, updatePurchases] = useState([])
    const [products, updateProducts] = useState([])
    //useState hook declares a new currentCustomer state variable (an object) and it's corresponding update component
    const [currentCustomer, changeCurrentCustomer] = useState({})

    const [purchasedProducts, updatePurchasedProdcuts] = useState([])

    useEffect(
        () => {
            fetchPurchasesofCurrentUser()
                .then(() => {
                    fetchAllProducts()
                }).then(() => {
                    const purchasedProductsArray = []
                    for (const purchase of purchases) {
                        const existingPurchaseProduct = purchasedProductsArray.find(obj => obj.productId === purchase.productLocation.productId)
                        if (existingPurchaseProduct) {
                            existingPurchaseProduct.quantity = existingPurchaseProduct.quantity + 1
                        } else {
                            const newPurchaseProduct = {
                                id: purchase.productLocation.productId,
                                productId: purchase.productLocation.productId,
                                quantity: 1
                            }
                            purchasedProductsArray.push(newPurchaseProduct)
                        }
                    }
                    updatePurchasedProdcuts(purchasedProductsArray)
                })
        },
        [purchases]
    )

    //useEffect hook fetches purchases specifically associated with the customerId of the value stored in local storage ("kandy_customer"), with expanded productLocation data, then updates the purchases state as that array.
    useEffect(
        () => {
            fetchPurchasesofCurrentUser()
                .then((data) => {
                    updatePurchases(data)
                })
        },
        []
    )

    //useEffect hook fetches all products and updates the products state with that array using the updateProducts component
    useEffect(
        () => {
            fetchAllProducts()
                .then((data) => {
                    updateProducts(data)
                })
        },
        []
    )

    //useEffect hook fetches the customer object with an id equal to the value stored in local storage ("kandy_customer"), and updates the currentCustomer state as that object (using the chagneCurrentCustomer state component)
    useEffect(
        () => {
            fetchCurrentCustomer()
                .then((data) => {
                    changeCurrentCustomer(data)
                })

        },
        []
    )


    //check length of the purchases state (an array). As long as it's not empty (length > 0), map through purchases and find the product object associated with each purchase (productLocation object) to display product details for each list element. If the purchases array is empty, display an alternate "No Recent Orders" message.
    if (purchases.length > 0) {
        return (
            <>
                <h2 className="heading">Orders For {currentCustomer.name}</h2>
                <div className="customer-list">

                    <table className="purchases-table">
                        <thead>
                            <tr className="purchases-headings">
                                <th className="purchases-heading-candy">Candy</th>
                                <th className="purchases-heading-quantity">Quantity</th>
                                <th className="purchases-heading-cost">Total Cost</th>
                            </tr>
                        </thead>
                        <tbody className="purchases-body">
                            {
                                purchasedProducts.map(

                                    (productObj) => {
                                        const foundProduct = products.find(
                                            (product) => product.id === productObj.productId
                                        )
                                        const totalCost = foundProduct?.price * productObj.quantity

                                        return <tr key={`product--${productObj.id}`} className="foundProduct__details">
                                            <td className="foundProduct__name">{foundProduct?.name}</td>
                                            <td className="foundProduct__quantity">{productObj.quantity}</td>
                                            <td className="foundProduct__totalCost">{totalCost}</td>
                                        </tr>
                                    }
                                )
                            }
                        </tbody>
                    </table>
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