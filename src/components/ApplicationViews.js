import React from "react"
import { Route } from "react-router-dom";
import { CustomerList } from "./customers/CustomerList";
import { EmployeeForm } from "./employees/EmployeeForm";
import { EmployeeList } from "./employees/EmployeeList";
import { LocationList } from "./locations/LocationList";
import { MyOrders } from "./orders/MyOrders";
import { ProductList } from "./products/ProductList";
import { PurchaseProductList } from "./products/PurchaseProductList";
import { Test } from "./Test";


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <ProductList />
            </Route>

            <Route path="/products">
                <ProductList />
            </Route>

            <Route exaxct path="/products/order">
                <PurchaseProductList />
            </Route>

            <Route exact path="/locations">
                <LocationList />
            </Route>

            <Route exact path="/employees">
                <EmployeeList />
            </Route>

            <Route exact path="/employees/hire">
                <EmployeeForm />
            </Route>

            <Route path="/customers">
                <CustomerList />
            </Route>

            <Route path="/purchases">
                <MyOrders />
            </Route>

            <Route path="/test">
                <Test />
            </Route>

        </>
    )
}