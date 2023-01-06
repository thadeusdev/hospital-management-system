import React, { useState, useEffect } from 'react'
import "./disease.css"
import SevereColdIcon from '@mui/icons-material/SevereCold';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import VerifiedIcon from '@mui/icons-material/Verified';
import { NavLink } from 'react-router-dom';

import { useNavigate, useParams } from 'react-router-dom';

const Disease = () => {
    const [diseaseedit, setDiseaseedit] = useState({name:'', symptoms:'', severity:''})
    const history = useNavigate()
    const {id} = useParams(); 

    // console.log(id)

    useEffect(() => {
        const editDiseaseId = async() => {
            const reqdata= await fetch(`/diseases/${id}`);
            const res= reqdata.json();
            setDiseaseedit(await res);
        }
        editDiseaseId()
    },[])

    const handleEdit = (e) => {
        setDiseaseedit({...diseaseedit, [e.target.name] : e.target.value})
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
                symptoms: e.target.symptoms.value,
                severity: e.target.severity.value
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
                        <span className="diseaseShowDiseaseTitle">{diseaseedit.symptoms}</span>
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
                <form onSubmit={ handleDiseaseupdate } className="diseaseUpdateForm">
                    <div className="diseaseUpdateLeft">
                        <div className="diseaseUpdateItem">
                            <label>Name</label>
                            <input type="text" name="name" placeholder='malaria' className='diseaseUpdateInput' value={diseaseedit.name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diseaseUpdateItem">
                            <label>Symptoms</label>
                            <input type="text" name="symptoms" placeholder='fever, headache' className='diseaseUpdateInput' value={diseaseedit.symptoms} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="diseaseUpdateItem">
                            <label>Severity</label>
                            <input type="text" name="severity" placeholder='High' className='diseaseUpdateInput' value={diseaseedit.severity} onChange={(e) => handleEdit(e)} />
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