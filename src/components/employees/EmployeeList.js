import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const EmployeeList = () => {
    const [employees, updateEmployee] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/employees?_expand=location&_sort=manager&_order=desc")
                .then(res => res.json())
                .then((data) => {
                    updateEmployee(data)
                })
        },
        []
    )


    return (

        <>
            <div>
                <button onClick={() => history.push("/employees/hire")}>Hire Employee</button>
            </div>

            {
                employees.map(
                    (employee) => {
                        return <div key={`employee--${employee.id}`}>
                            <h3>{employee.name}</h3>
                            <section className="employee_location">Location: {employee.location.city}</section>
                            <section className="employee_managerStatus">Postion: {employee.manager? `Manager` : `Regular Employee`}</section>
                            <section className="employee_fullTimeStatus">Status: {employee.fullTime? `Full-Time` : `Part-Time`}</section>
                            <section className="employee_hourlyRate">Hourly Rate: ${employee.hourlyRate}</section>
                        
                        
                        </div>
                    }
                )
            }
        </>
    )
}