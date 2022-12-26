import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function DiagnosesTable() {
    const [diagnoses, setDiagnoses] = useState([])

    useEffect(() => {
        fetch('/diagnostics')
        .then(res => res.json())
        .then((diagnoses => setDiagnoses(diagnoses)))
    }, [])

  return (
    <div className="tables">        
        <div className="last-appointments">
            <div className="heading">
                <h2>Diagnoses</h2>
                <Link to="/addDoctor">
                    <button className="btn">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        Add Diagnoses
                    </button>
                </Link>                
            </div>            
            <table className="appointments">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Notes</th>
                        <th>Patient</th>
                        <th>Disease</th>
                        <th>Symptoms</th>
                        <th>Pulse</th>
                        <th>Sugar</th>
                        <th>Temperature</th>
                        <th>Pressure</th>
                        <th>Action</th>
                    </tr>
                </thead>                 
                <tbody>
                    {diagnoses.map((diagnose) => (
                        <tr key={diagnose.id}>                        
                            <td>{diagnose.patient.visiting_date}</td>
                            <td>{diagnose.notes}</td>
                            <td>{diagnose.patient.full_name}</td>
                            <td>{diagnose.disease.name}</td>
                            <td>{diagnose.disease.symptoms}</td>
                            <td>{diagnose.pulse}</td>
                            <td>{diagnose.sugar}</td>
                            <td>{diagnose.temperature}</td>
                            <td>{diagnose.pressure}</td>
                            <td>
                                <i className="far fa-eye" />
                                <Link to="/updateDoctor">
                                    <i className="far fa-edit" />
                                </Link>                                
                                <i className="far fa-trash-alt" />
                            </td>
                        </tr> 
                    ))}                              
                </tbody>              
                 
            </table>           
        </div>        
    </div> 
  )
}

export default DiagnosesTable