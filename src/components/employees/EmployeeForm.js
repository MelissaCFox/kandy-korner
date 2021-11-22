import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAllLocations, postEmployee } from "../APIManager";
import "./Employees.css"

export const EmployeeForm = () => {
    //useState hook declares a (new) employee state variable (initially an empty object) and update component for the form fields to use to update and build (new) employee object for the saveEmployee hiring component
    const [employee, update] = useState({
        manager: false,
        fullTime: false
    });

    //useHistory() is a React hook that navigates to a specific Route using "the state variable".push("the routh path")
    const history = useHistory()

    //useState hook establishes state variable and update component
    const [locations, updateLocations] = useState([])

    //useEffect hook fetches locations array from API and updates location state using the update component established with useState
    useEffect(
        () => {
            fetchAllLocations()
                .then((data) => {
                    updateLocations(data)
                })
        },
        []
    )


    const saveEmployee = (event) => {
        event.preventDefault()
        const newEmployee = {
            name: employee.name,
            locationId: employee.locationId,
            manager: employee.manager,
            fullTime: employee.fullTime,
            hourlyRate: employee.hourlyRate
        }
        //Once the new employee object is saved ("hired"), history.push("/employees") is used to automatically redirect user to the employee list component
        postEmployee(newEmployee)
            .then(() => {
                history.push("/employees")
            })
    }

    //onChange event handlers are directly within the form elements to automatically update the (new)employee state
    //onClick event handlers are  directly within the buttons at the end of the form to invoke the saveEmployee function or push to a different route (cancel button)
    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">Hire Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:  </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:  </label>
                    <select

                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.locationId = parseInt(evt.target.value)
                                update(copy)
                            }

                        } >
                        <option key={`location--0`} value={`0`}>Select a location</option>
                        {locations.map(
                            (location) => {
                                return <option key={`location--${location.id}`} value={location.id}>{location.city}</option>
                            }
                        )}

                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="manager">Manager </label>
                    <input
                        required autoFocus
                        type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.manager = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullTime">Full Time </label>
                    <input className="name-field"
                        required autoFocus
                        type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.fullTime = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group rate">
                    <label className="rate-label" htmlFor="rate">Hourly Rate:  </label>
                    <input type="number"
                        className="form-control rate-field"
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.hourlyRate = evt.target.value
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>

            <button className="btn btn-primary" onClick={saveEmployee}>
                Hire Employee
            </button>
            <button className="btn btn-primary" onClick={() => history.push("/employees")}>
                Cancel
            </button>
        </form>
    )
}