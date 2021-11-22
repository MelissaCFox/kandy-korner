import React from "react"
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"


//if there is currently a "kandy_customer" item in local storage, the ApplicaitonViews component with be invoked.
//if not, user will be directed to the "/login" Route path where they can either Login or register a new user.

export const KandyKorner = () => {
    return (
        <>
            <Route
                render={() => {
                    if (localStorage.getItem("kandy_customer")) {
                        return (
                            <>
                                <NavBar />
                                <h1 className="store-name">Kandy Korner</h1>
                                <ApplicationViews />
                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>

        </>

    )
}

