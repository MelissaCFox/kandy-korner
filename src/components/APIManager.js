

export const fetchCustomers = () => {
    fetch("http://localhost:8088/customers")
    .then(res => res.json())
    .then((data) => {
        updateCustomer(data)
    })
}