import React, { useState, useEffect } from 'react'
import "./diagnose.css"
import { BarChart, Bar, Tooltip, Legend } from 'recharts';
import { NavLink } from 'react-router-dom';

import { useNavigate, useParams } from 'react-router-dom';

const Diagnose = () => {
    const data = [
        {
          name: 'Chronic condition',
          sugar: 140,
          pressure: 80,
          temperature: 37,
          pulse: 100,
        },
      ];

    const [diagnoseedit, setDiagnoseedit] = useState({name:'', patient_id:'', doctor_id:'', disease_id:'', performed_at:'', pulse:'', sugar:'', temperature:'', pressure:''})
    const history = useNavigate()
    const {id} = useParams();    

    // console.log(id)

    useEffect(() => {
        const editDiagnoseId = async() => {
            const reqdata= await fetch(`/diagnostics/${id}`);
            const res= reqdata.json();
            setDiagnoseedit(await res);
        }
        editDiagnoseId()
    },[])

    const handleEdit = (e) => {
        setDiagnoseedit({...diagnoseedit, [e.target.name] : e.target.value})
    }

    function handleDiagnoseupdate(e){        
        e.preventDefault();
        fetch(`/diagnostics/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: e.target.name.value,
                patient_id: e.target.patient_id.value,
                doctor_id: e.target.doctor_id.value,
                disease_id: e.target.disease_id.value,
                performed_at: e.target.performed_at.value,
                pulse: e.target.pulse.value,
                sugar: e.target.sugar.value,
                temperature: e.target.temperature.value,
                pressure: e.target.pressure.value
            }),
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
    }

  return (
    <div className='diagnose'> 
        <div className="diagnoseTitleContainer">
            <h1 className="diagnoseTitle">Edit diagnose</h1>
            <NavLink to="/newDiagnose">
                <button className="diagnoseAddButton">Create</button>
            </NavLink>            
        </div> 
        <div className="diagnoseContainer">
            <div className="diagnoseShow">
                <BarChart width={300} height={300} data={data}>
                    <Bar dataKey="sugar" fill="#8884d8" stroke='#5550bd' />
                    <Bar dataKey="pressure" fill="#8884d8" stroke='#5550bd' />
                    <Bar dataKey="pulse" fill="#8884d8" stroke='#5550bd' />
                    <Bar dataKey="temperature" fill="#8884d8" stroke='#5550bd' />
                    <Tooltip />
                    <Legend />
                </BarChart>
            </div>
            <div className="diagnoseUpdate">
            <span className="diagnoseUpdateTitle">Edit</span>
            <form onSubmit={ handleDiagnoseupdate } className="diagnoseUpdateForm">
                    <div className="diagnoseUpdateLeft">
                        <div className="diagnoseUpdateItem">
                            <label>Name</label>
                            <input type="text" name="name" className='diagnoseUpdateInput' value={diagnoseedit.name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Patient Id</label>
                            <input type="text" name="patient_id" className='diagnoseUpdateInput' value={diagnoseedit.patient_id} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Doctor Id</label>
                            <input type="text" name="doctor_id" className='diagnoseUpdateInput' value={diagnoseedit.doctor_id} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Disease Id</label>
                            <input type="text" name="disease_id" className='diagnoseUpdateInput' value={diagnoseedit.disease_id} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Performed At</label>
                            <input type="text" name="performed_at" className='diagnoseUpdateInput' value={diagnoseedit.performed_at} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Pulse</label>
                            <input type="text" name="pulse" className='diagnoseUpdateInput' value={diagnoseedit.pulse} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Sugar</label>
                            <input type="text" name="sugar" className='diagnoseUpdateInput' value={diagnoseedit.sugar} onChange={(e) => handleEdit(e)} />
                        </div> 
                        <div className="diagnoseUpdateItem">
                            <label>Temperature</label>
                            <input type="text" name="temperature" className='diagnoseUpdateInput' value={diagnoseedit.temperature} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Pressure</label>
                            <input type="text" name="pressure" className='diagnoseUpdateInput' value={diagnoseedit.pressure} onChange={(e) => handleEdit(e)} />
                        </div>                       
                    </div>
                    <div className="diagnoseUpdateRight">
                        <button className="diagnoseUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>      
    </div>
  )
}

export default Diagnose