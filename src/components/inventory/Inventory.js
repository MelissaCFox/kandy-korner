import React, { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { fetchAllProducts } from "../APIManager"





export const Inventory = () => {
    
    
    const InventorySearch = () => {
        const [userSearchTerm, setUserSearchTerm] = useState("")
        const [productList, updateProductList] = useState([])
    
        useEffect(
            () => {
                fetchAllProducts()
                    .then((allProducts) => {
                        const productListArray = allProducts.filter(
                            (product) => product.name.includes(userSearchTerm)
                        )
                        updateProductList(productListArray)
                    })
    
            }, [userSearchTerm]
        )
        console.log(productList)
    
        return <>
            <div className="search-field">
                <label htmlFor="search-term">Search for a Product:  </label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                    onChange={
                        (evt) => {
                            const userSearch = evt.target.value
                            setUserSearchTerm(userSearch)
                        }
                    } />
            </div>
        </>
    }
    
    
    // const InventoryList = () => {
    //     return (
    //         <>
    //                     <div className="product__list">
    //                 {
    //                     productList.map(
    //                         (product) => {
                                
    //                             return <div key={`product--${product.id}`}>
    //                                 <div className="product__name">{product.name}
    
    //                                 </div>
    //                             </div>
    //                         }
    //                     )
    //                 }
    //             </div>
    //         </>
    //     )
    // }
    
    return (
        <>
            <InventorySearch />
            

        </>

    )
}