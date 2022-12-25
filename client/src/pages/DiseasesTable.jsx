import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function DiseasesTable() {
    const [diseases, setDiseases] = useState([])

    useEffect(() => {
        fetch("/diseases")
        .then(r => r.json())
        .then(diseases => setDiseases(diseases))
    }, [])

    function handleDelete(id){
        fetch(`diseases/${id}`,{
         method: "DELETE"
        })
        setDiseases(diseases.filter((disease)=> disease.id !== id))
    }

  return (
    <div className="tables">        
        <div className="last-appointments">
            <div className="heading">
                <h2>Diseases</h2>
                <Link to="/addDisease">
                    <button className="btn">
                        Add Disease
                    </button>
                </Link>                
            </div>            
            <table className="appointments">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symptoms</th>
                        <th>Severity</th>
                        <th>Action</th>
                    </tr>
                </thead>                 
                <tbody>
                    {diseases.map((disease) => (
                        <tr key={disease.id}>                        
                            <td>{disease.name}</td>
                            <td>{disease.symptoms}</td>
                            <td>{disease.severity}</td>
                            <td>
                                <i className="far fa-eye" />
                                <i className="far fa-edit" />
                                <i onClick={()=>handleDelete(disease.id)} className="far fa-trash-alt" />
                            </td>
                        </tr> 
                    ))}                              
                </tbody>              
                
            </table>           
        </div>        
    </div> 
  )
}

export default DiseasesTable