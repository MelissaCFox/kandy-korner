import React, { useEffect, useState } from "react"
import "./CustomerList.css"

export const CustomerList = () => {
    //useState hook declares a new customers state and updateCustomer component to manage the customers state
    const [customers, updateCustomer] = useState([])

    //UseEffect hook fetches all customers and set customers state using updateCustomer state component
     useEffect(
        () => {
            fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then((data) => {
                    updateCustomer(data)
                })
        },
        []
    )

  //map through customer state to render jsx with customer details
    return (

        <>
        <div className="customer-list">
            {
                customers.map(
                    (customer) => {
                        return <div key={`customer--${customer.id}`}>
                            <h3>{customer.name}</h3>
                            <section className="customer_email">Email: {customer.email}</section>

                        </div>
                    }
                )
            }
            </div>
        </>
    )
}