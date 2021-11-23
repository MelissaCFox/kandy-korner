//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"
import { fetchAllLocations, fetchAllProducts, fetchCurrentCustomer, fetchPurchasesofCurrentUser } from "../APIManager"
import "./MyOrders.css"

export const MyOrders = () => {
    //useState hooks declare new state variables: purcahses and products (both arrays) and their corresponding update components
    const [purchases, updatePurchases] = useState([])
    const [products, updateProducts] = useState([])
    const [locations, updateLocations] = useState([])
    //useState hook declares a new currentCustomer state variable (an object) and it's corresponding update component
    const [currentCustomer, changeCurrentCustomer] = useState({})

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

    useEffect(
        () => {
            fetchAllLocations()
                .then((data) => {
                    updateLocations(data)
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

                    {
                        purchases.map(
                            (purchase) => {
                                const foundProduct = products.find(
                                    (product) => product.id === purchase.productLocation.productId
                                )
                                const foundLocation = locations.find(
                                    (location) => location.id === purchase.productLocation.locationId
                                )
                                return <div className="purchase__item" key={`purchase--${purchase.id}`}>
                                    <h3>Purchase # {purchase.id}</h3>
                                    <section className="purchase__productName">Product Name: {foundProduct?.name}</section>
                                    <section className="purchase__productPrice">Price: ${foundProduct?.price}</section>
                                    <section className="purchase__productLocationCity">Purchased at the {foundLocation?.city} location</section>
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





/* <table className="purchases-table">
<thead>
<tr className="purchases-headings">
    <th>Candy</th>
    <th>Quantity</th>
    <th>Total Price</th>
</tr>
</thead>
<tbody>
{
    purchasedProducts.map( 
    
        (productObj) => {
            const foundProduct = products.find(
                (product) => product.id === productObj.productId
            ) 

            
            return <tr key={`product--${productObj.id}`} className="foundProduct__details">
                <td className="foundProduct__name">{foundProduct?.name}</td>
                <td className="foundProduct__quantity">{productObj.quantity}</td>
                
            </tr>
        }
    )
}
</tbody>
</table> */