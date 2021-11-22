import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"


//onClick event handler in logout button removes the two local storage items (customer and location) so that the user is redirected to the login page and the new user, once logged in, does not have a location id already set into local storage

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/products">Products</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/purchases">My Orders</Link>
            </li>

            <li className="navbar__item active">
                        <Link className="navbar__link" to="#"
                            onClick={
                                () => {
                                    localStorage.removeItem("kandy_customer")
                                    localStorage.removeItem("kandy_location")
                                }
                            } >
                            Logout
                        </Link>
                    </li>

        </ul>
    )
}