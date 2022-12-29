import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function MedicinesTable() {
  const [medicines, setMedicines] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/medicines');
      const json = await response.json();
      setMedicines(json);
    }

    fetchData();
  }, []);

  if (!medicines) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tables">        
        <div className="stocked-medicines">
            <div className="heading">
                <h2>Medicines</h2>
                <Link to="/addDoctor">
                    <button className="btn">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        Add Medicines
                    </button>
                </Link>                
            </div>            
            <table className="Medicine-Details">
                <thead>
                    <tr>
                        <th>Date Stocked</th>
                        <th>Name</th>
                        <th>Patient</th>
                        <th>Disease</th>
                        <th>Prescription</th>
                        
                    </tr>
                </thead>                 
                <tbody>
                    {medicines.map((medicine) => (
                        <tr key={medicine.id}>                        
                            <td>{medicine.patient.visiting_date}</td>
                            <td>{medicine.notes}</td>
                            <td>{medicine.patient.full_name}</td>
                            <td>{medicine.disease.name}</td>
                            <td>{medicine.disease.symptoms}</td>
                            <td>{medicine.pulse}</td>
                            <td>{medicine.sugar}</td>
                            <td>{medicine.temperature}</td>
                            <td>{.pressure}</td>
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

export default MedicinesTable