import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PatientsTable() {
    const [patients, setPatients] = useState([]) 

    useEffect(() => {
        fetch('/patients')
        .then(r => r.json())
        .then(patients => setPatients(patients))
    },[])

    function handleDelete(id){
        fetch(`patients/${id}`,{
         method: "DELETE"
        })
        setPatients(patients.filter((patient)=> patient.id !== id))
    }

  return (
    <div className="tables">
        <div className="last-appointments">
            <div className="heading">
                <h2>Patients</h2>
                <Link to="/addPatient">
                    <button className="btn">
                        Add Patient
                    </button>
                </Link>
            </div>            
            <table className="appointments">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Visiting date</th>
                        <th>Visit No.</th>
                        <th>Action</th>
                    </tr>
                </thead>                 
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>                        
                            <td>{patient.full_name}</td>
                            <td>{patient.address}</td>
                            <td>{patient.visiting_date}</td>
                            <td>{patient.visit_no}</td>
                            <td>
                                <i className="far fa-eye" />
                                <i className="far fa-edit" />
                                <i onClick={()=>handleDelete(patient.id)} className="far fa-trash-alt" />
                            </td>
                        </tr> 
                    ))}                              
                </tbody>              
                 
            </table>           
        </div>        
    </div>  
  )
}

export default PatientsTable