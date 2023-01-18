import React, { useState, useEffect } from 'react'
import "./disease.css"
import SevereColdIcon from '@mui/icons-material/SevereCold';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import VerifiedIcon from '@mui/icons-material/Verified';
import { NavLink } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const Disease = () => {
    const [diseaseedit, setDiseaseedit] = useState({name:'', symptoms:'', severity:''})
    const {id} = useParams(); 

    // console.log(id)

    useEffect(() => {
        const editDiseaseId = async() => {
            const reqdata= await fetch(`/diseases/${id}`);
            const res= reqdata.json();
            setDiseaseedit(await res);
        }
        editDiseaseId()
    },[id])

    const handleEdit = (e) => {
        setDiseaseedit({...diseaseedit, [e.target.name] : e.target.value})
        setPatientedit({...patientedit, [e.target.name] : e.target.value})
    }

    function handleDiseaseupdate(e){        
        e.preventDefault();
        fetch(`/diseases/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: e.target.name.value,
                // patient_id: e.target.patient_id.value,
                symptoms: e.target.symptoms.value,
                severity: e.target.severity.value
            }),
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
    }

    const [patientedit, setPatientedit] = useState({full_name:''})
    useEffect(() => {
        const editPatientId = async() => {
            const reqdata= await fetch(`/diseases/${id}/patients/${id}`);
            const res= reqdata.json();
            setPatientedit(await res);
        }
        editPatientId()
    },[id])

    function handlePatientupdate(e){        
        e.preventDefault();
        fetch(`/diseases/${id}/patients/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                full_name: e.target.full_name.value,
            }),
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
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
                        <span className="diseaseShowDiseasename">{diseaseedit.name}</span>
                        <span className="diseaseShowDiseaseTitle">{patientedit.full_name}</span>
                    </div>
                </div>
                <div className="diseaseShowBottom">
                    <span className="diseaseShowTitle">Disease</span>
                    <div className="diseaseShowInfo">
                        <CoronavirusIcon className="diseaseShowIcon" />
                        <span className="diseaseShowInfoTitle">{diseaseedit.name}</span>
                    </div> 
                    <span className="diseaseShowTitle">Symptoms</span> 
                    <div className="diseaseShowInfo">
                        <VerifiedIcon className="diseaseShowIcon" />
                        <span className="diseaseShowInfoTitle">{diseaseedit.symptoms}</span>
                    </div> 
                    <span className="diseaseShowTitle">Severity</span> 
                    <div className="diseaseShowInfo">
                        <SevereColdIcon className="diseaseShowIcon" />
                        <span className="diseaseShowInfoTitle">{diseaseedit.severity}</span>
                    </div>                  
                </div>
            </div>
            <div className="diseaseUpdate">
                <span className="diseaseUpdateTitle">Edit</span>
                <form onSubmit={ handleDiseaseupdate } onClick={handlePatientupdate} className="diseaseUpdateForm">
                    <div className="diseaseUpdateLeft">
                        <div className="diseaseUpdateItem">
                            <label>Name</label>
                            <input type="text" name="name" className='diseaseUpdateInput' value={diseaseedit.name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diseaseUpdateItem">
                            <label>Patient</label>
                            <input type="text" name="full_name" className='diseaseUpdateInput' value={patientedit.full_name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diseaseUpdateItem">
                            <label>Symptoms</label>
                            <input type="text" name="symptoms" className='diseaseUpdateInput' value={diseaseedit.symptoms} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diseaseUpdateItem">
                            <label>Severity</label>
                            <input type="text" name="severity" className='diseaseUpdateInput' value={diseaseedit.severity} onChange={(e) => handleEdit(e)} />
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