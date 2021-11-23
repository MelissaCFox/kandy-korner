import React, { useEffect, useState } from "react"
import "./CustomerList.css"

export const CustomerList = () => {


    const [customerPurchases, updateCustomerPurchases] = useState([])

    useEffect(
        () => {
            return fetch("http://localhost:8088/customers?_embed=purchases")
                .then(res => res.json())
                .then((data) => {
                    updateCustomerPurchases(data)
                })
        },
        []
    )

    //Sort CustomerPurchases state array and return as a new array that will be mapped-through in return below:
    const getSortedCustomerPurchases = () => {
        return customerPurchases.map(customer => ({...customer})).sort(
            (a,b) => b.purchases.length - a.purchases.length)
    }

    const sortedCustomerPurchases = getSortedCustomerPurchases()
    

    //map through customer state to render jsx with customer details
    return (

        <>
            <div className="customer-list">
                <table className="customers-table">
                    <thead>
                    <tr className="table-headings">
                        <th>Customer</th>
                        <th>Candies Bought</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sortedCustomerPurchases.map(
                            
                            (customer) => {
                               
                                return <tr key={`customer--${customer.id}`} className="customer__details">
                                    <td className="customer__name">{customer.name}</td>
                                    <td className="customer__email">{customer.purchases.length}</td>
                                </tr>
                            }
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}
