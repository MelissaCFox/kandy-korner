
export const fetchCustomerByEmail = (email) => {
    return fetch(`http://localhost:8088/customers?email=${email}`)
        .then(res => res.json())
}

export const fetchAllCustomers = () => {
    return fetch("http://localhost:8088/customers")
        .then(res => res.json())
}

export const fetchAllLocations = () => {
    return fetch("http://localhost:8088/locations")
        .then(res => res.json())
}

export const fetchLocationsWithProductLocations = () => {
    return fetch("http://localhost:8088/locations?_embed=productLocations")
        .then(res => res.json())
}

export const postEmployee = (newEmployee) => {

    return fetch("http://localhost:8088/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    })
}

export const fetchAllEmployees = () => {
    return fetch("http://localhost:8088/employees?_expand=location&_sort=hourlyRate&_order=desc")
                .then(res => res.json())
}

export const deleteEmployee = (id) => {
    return fetch(`http://localhost:8088/employees/${id}`, {
            method: "DELETE"
        })
}

export const fetchPurchasesofCurrentUser = () => {
    return fetch(`http://localhost:8088/purchases?_expand=productLocation&customerId=${parseInt(localStorage.getItem("kandy_customer"))}`)
    .then(res => res.json())
}

export const fetchAllProducts = () => {
    return fetch(`http://localhost:8088/products`)
                .then(res => res.json())
}

export const fetchCurrentCustomer = () => {
    return fetch(`http://localhost:8088/customers/${parseInt(localStorage.getItem("kandy_customer"))}`)
    .then(res => res.json())
}

export const fetchAllProductTypes = () => {
    return fetch("http://localhost:8088/productTypes")
    .then(res => res.json())
}

export const fetchProductsWithProductTypes = () => {
    return fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId")
    .then(res => res.json())
}

export const fetchProductLocationsForCurrentLocation = () => {
    return fetch(`http://localhost:8088/productLocations?locationId=${parseInt(localStorage.getItem("kandy_location"))}&_expand=product`)
    .then(res => res.json())
}

export const fetchProductLocationByProductId = (id) => {
    return fetch(`http://localhost:8088/productLocations?productId=${parseInt(id)}`)
    .then(res => res.json())
}

export const postPurchase = (newPurchase) => {
    return fetch("http://localhost:8088/purchases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPurchase)
    })
}

export const fetchCustomersWithPurchases = () => {
    return fetch("http://localhost:8088/customers?_embed=purchases")
                .then(res => res.json())
}
