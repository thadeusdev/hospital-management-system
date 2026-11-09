import React, { useState, useEffect } from 'react'
import "./disease.css"
import SevereColdIcon from '@mui/icons-material/SevereCold';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import VerifiedIcon from '@mui/icons-material/Verified';
import { NavLink, useParams } from 'react-router-dom';

const Disease = () => {
    const [singleDisease, setSingleDisease] = useState({name: '', patient_id: '', symptoms: '', severity: ''});
    const [patients, setPatients] = useState([]);
    const {id} = useParams();
    // console.log(id);

    useEffect(() => {
        fetch(`/diseases/${id}`)
        .then(res => res.json())
        .then(singleDisease => setSingleDisease(singleDisease))
    }, []);

    useEffect(() => {
        fetch('/patients')
        .then(res => res.json())
        .then(patients => setPatients(patients))
    }, []);

    const handleEdit = (e) => {
        setSingleDisease({...singleDisease, [e.target.name] : e.target.value})
    }

    function handleUpdate(e){        
        e.preventDefault();
        fetch(`/diseases/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: e.target.name.value,
                patient_id: e.target.patient_id.value,
                symptoms: e.target.symptoms.value,
                severity: e.target.severity.value,
            }),
        })
        .then((r) => r.json())
        .then((data) => {
            setPatients([...patients, data])
            console.log(data)
        })
    }

  return (
    <div className='disease'>
        <div className="diseaseTitleContainer">
            <h1 className="diseaseTitle">Edit disease</h1>
            <NavLink to="/newDisease">
                <button className="diseaseAddButton">Create</button>
            </NavLink>            
        </div>
        <div className="diseaseContainer">
            <div className="diseaseShow">
                <div className="diseaseShowTop">
                    <div className="diseaseShowTopTitle">
                        <span className="diseaseShowDiseasename">{singleDisease.name}</span>
                        <span className="diseaseShowDiseaseTitle">Patient: {singleDisease.patient_name}</span>
                    </div>
                </div>
                <div className="diseaseShowBottom">
                    <span className="diseaseShowTitle">Disease</span>
                    <div className="diseaseShowInfo">
                        <CoronavirusIcon className="diseaseShowIcon" />
                        <span className="diseaseShowInfoTitle">{singleDisease.name}</span>
                    </div> 
                    <span className="diseaseShowTitle">Symptoms</span> 
                    <div className="diseaseShowInfo">
                        <VerifiedIcon className="diseaseShowIcon" />
                        <span className="diseaseShowInfoTitle">{singleDisease.symptoms}</span>
                    </div> 
                    <span className="diseaseShowTitle">Severity</span> 
                    <div className="diseaseShowInfo">
                        <SevereColdIcon className="diseaseShowIcon" />
                        <span className="diseaseShowInfoTitle">{singleDisease.severity}</span>
                    </div>                  
                </div>
            </div>
            <div className="diseaseUpdate">
                <span className="diseaseUpdateTitle">Edit</span>
                <form className="diseaseUpdateForm" onSubmit={handleUpdate}>
                    <div className="diseaseUpdateLeft">
                        <div className="diseaseUpdateItem">
                            <label>Name</label>
                            <input type="text" name="name" className='diseaseUpdateInput' value={singleDisease.name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diseaseUpdateItem">
                            <label>Patient</label>
                            <select name="patient_id" value={singleDisease.patient_id} onChange={(e) => handleEdit(e)}>
                                {patients.map(patient => (
                                    <option key={patient.id} value={patient.id}>{patient.full_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="diseaseUpdateItem">
                            <label>Symptoms</label>
                            <input type="text" name="symptoms" className='diseaseUpdateInput' value={singleDisease.symptoms} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diseaseUpdateItem">
                            <label>Severity</label>
                            <input type="text" name="severity" className='diseaseUpdateInput' value={singleDisease.severity} onChange={(e) => handleEdit(e)} />
                        </div>                                                 
                    </div>
                    <div className="diseaseUpdateRight">
                        <button className="diseaseUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Disease