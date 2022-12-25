import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function DoctorsTable() {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        fetch('/doctors')
        .then(res => res.json())
        .then((doctors => setDoctors(doctors)))
    }, [])

    function handleDelete(id){
        fetch(`doctors/${id}`,{
         method: "DELETE"
        })
        setDoctors(doctors.filter((doctor)=> doctor.id !== id))
    }
    
  return (
    <div className="tables">        
        <div className="last-appointments">
            <div className="heading">
                <h2>Doctors</h2>
                <Link to="/addDoctor">
                    <button className="btn">
                        Add Doctor
                    </button>
                </Link>                
            </div>            
            <table className="appointments">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Primary Practice</th>
                        <th>Secondary Practice</th>
                        <th>Action</th>
                    </tr>
                </thead>                 
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>                        
                            <td>{doctor.full_name}</td>
                            <td>{doctor.primary_practice}</td>
                            <td>{doctor.secondary_practice}</td>
                            <td>
                                <i className="far fa-eye" />
                                <i className="far fa-edit" />
                                <i onClick={()=>handleDelete(doctor.id)} className="far fa-trash-alt" />
                            </td>
                        </tr> 
                    ))}                              
                </tbody>              
                 
            </table>           
        </div>        
    </div> 
  )
}

export default DoctorsTable