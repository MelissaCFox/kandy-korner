import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Employees.css"

export const EmployeeList = () => {
    //UseState hook decalres a new employees state and updateEmployee component to maintain state for employees array
    const [employees, updateEmployee] = useState([])

    //useHistory() is a React hook that navigates to a specific Route using "the state variable".push("the routh path")
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/employees?_expand=location&_sort=hourlyRate&_order=desc")
                .then(res => res.json())
                .then((data) => {
                    updateEmployee(data)
                })
        },
        []
    )

    const fireEmployee = (id) => {
            return fetch(`http://localhost:8088/employees/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch("http://localhost:8088/employees?_expand=location&_sort=hourlyRate&_order=desc")
                .then(res => res.json())
                .then((data) => {
                    updateEmployee(data)
                })
            })

    }
    
    //onClick event handler directly within fire button to invoke fireEmployee component
    return (

        <>
            <div className="hire-button-div">
                <button className="hire-button" onClick={() => history.push("/employees/hire")}>Hire Employee</button>
            </div>
            <div className="employee-list">
            {
                employees.map(
                    (employee) => {
                        return <div key={`employee--${employee.id}`}>
                            <h3>{employee.name}</h3>
                            <section className="employee_location">Location: {employee.location.city}</section>
                            <section className="employee_managerStatus">Postion: {employee.manager? `Manager` : `Regular Employee`}</section>
                            <section className="employee_fullTimeStatus">Status: {employee.fullTime? `Full-Time` : `Part-Time`}</section>
                            <section className="employee_hourlyRate">Hourly Rate: ${employee.hourlyRate}</section>
                            <button className="btn btn-primary" value={employee.id} onClick={() => {fireEmployee(employee.id)}}>Fire Employee</button>
                        
                        </div>
                    }
                )
            }
            </div>
        </>
    )
}