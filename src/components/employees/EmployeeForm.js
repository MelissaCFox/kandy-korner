import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Employees.css"

export const EmployeeForm = () => {
    const [employee, update] = useState({
        manager: false,
        fullTime: false
    });

    const history = useHistory()

    const [locations, updateLocations] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
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

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        }

        return fetch("http://localhost:8088/employees", fetchOption)
            .then(() => {
                history.push("/employees")
            })

    }

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
                    <label className="rate-label"htmlFor="rate">Hourly Rate:  </label>
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