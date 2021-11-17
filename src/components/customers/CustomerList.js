import React, { useEffect, useState } from "react"

export const CustomerList = () => {
    const [customers, updateCustomer] = useState([])

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


    return (

        <>
            {
                customers.map(
                    (customer) => {
                        return <div key={`customer--${customer.id}`}>
                            <h3>{customer.name}</h3>
                            <section className="customer_memberStatus">Member Status: {customer.member? `Active` : `Not a member`}</section>
                            <section className="customer_email">Email: {customer.email}</section>

                        </div>
                    }
                )
            }
        </>
    )
}