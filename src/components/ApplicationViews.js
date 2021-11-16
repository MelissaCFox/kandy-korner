import React from "react"
import { Route } from "react-router-dom";
import { EmployeeForm } from "./employees/EmployeeForm";
import { EmployeeList } from "./employees/EmployeeList";
import { LocationList } from "./locations/LocationList";
import { ProductList } from "./products/ProductList";


export const ApplicationViews = () => {
    return (
        <>
            <Route exaxct path ="/products">
                <ProductList />
            </Route>

            <Route exact path ="/locations">
                <LocationList />
            </Route>

            <Route exact path ="/employees">
                <EmployeeList />
            </Route>

            <Route exact path ="/employees/hire">
                <EmployeeForm />
            </Route>

        </>
    )
}