//Importing React itself is no longer necessary
import React, { useEffect, useState } from "react"

export const ProductList = () => {
    const [products, updateProduct] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId")
                .then(res => res.json())
                .then((data) => {
                    updateProduct(data)
                })
        },
        []
    )


    return (
        <>
            {
                products.map(
                    (product) => {
                        return <div>
                            <h3 key={`product--${product.id}`}>{product.name}</h3>
                            <p>Product Type: {product.productType.type}</p>
                            <p>Price: ${product.price}</p>
                            </div>
                    }
                )
            }
        </>
    )
}