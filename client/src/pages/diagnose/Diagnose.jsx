import React, { useState, useEffect } from 'react'
import "./diagnose.css"
import { BarChart, Bar, Tooltip, Legend } from 'recharts';
import { NavLink, useParams } from 'react-router-dom';

const Diagnose = () => {
    const [singleDiagnose, setSingleDiagnose] = useState({name: '', patient_id: '', doctor_id: '', disease_id: '', performed_at: '', pulse: '', sugar: '', temperature: '', pressure: ''});
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const {id} = useParams()
    // console.log(id)

    const data = [
        {
            name: 'Chronic condition',
            sugar: 140,
            pressure: 80,
            temperature: 37,
            pulse: 100,
        },
    ];

    useEffect(() => {
        fetch('/patients')
        .then(res => res.json())
        .then(patients => setPatients(patients))
    }, []);

    useEffect(() => {
        fetch('/doctors')
        .then(res => res.json())
        .then(doctors => setDoctors(doctors))
    }, []);

    useEffect(() => {
        fetch('/diseases')
        .then(res => res.json())
        .then(diseases => setDiseases(diseases))
    }, []);

    useEffect(() => {
        fetch(`/diagnostics/${id}`)
        .then(res => res.json())
        .then(singleDiagnose => setSingleDiagnose(singleDiagnose))
    }, [])

    const handleEdit = (e) => {
        setSingleDiagnose({...singleDiagnose, [e.target.name] : e.target.value})
    };

    const handleUpdate = (e) => {        
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
                pressure: e.target.pressure.value,
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
            <form className="diagnoseUpdateForm" onSubmit={handleUpdate}>
                    <div className="diagnoseUpdateLeft">
                        <div className="diagnoseUpdateItem">
                            <label>Name</label>
                            <input type="text" name="name" className='diagnoseUpdateInput' value={singleDiagnose.name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Patient</label>
                            <select name="patient_id" value={singleDiagnose.patient_id} onChange={(e) => handleEdit(e)}>
                                {patients.map(patient => (
                                    <option key={patient.id} value={patient.id}>{patient.full_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Doctor</label>
                            <select name="doctor_id" value={singleDiagnose.doctor_id} onChange={(e) => handleEdit(e)}>
                                {doctors.map(doctor => (
                                    <option key={doctor.id} value={doctor.id}>{doctor.full_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Disease</label>
                            <select name="disease_id" value={singleDiagnose.disease_id} onChange={(e) => handleEdit(e)}>
                                {diseases.map(disease => (
                                    <option key={disease.id} value={disease.id}>{disease.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Performed At</label>
                            <input type="text" name="performed_at" className='diagnoseUpdateInput' value={singleDiagnose.performed_at} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Pulse</label>
                            <input type="text" name="pulse" className='diagnoseUpdateInput' value={singleDiagnose.pulse} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Sugar</label>
                            <input type="text" name="sugar" className='diagnoseUpdateInput' value={singleDiagnose.sugar} onChange={(e) => handleEdit(e)} />
                        </div> 
                        <div className="diagnoseUpdateItem">
                            <label>Temperature</label>
                            <input type="text" name="temperature" className='diagnoseUpdateInput' value={singleDiagnose.temperature} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diagnoseUpdateItem">
                            <label>Pressure</label>
                            <input type="text" name="pressure" className='diagnoseUpdateInput' value={singleDiagnose.pressure} onChange={(e) => handleEdit(e)} />
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