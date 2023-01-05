import React, { useState, useEffect } from 'react'
import "./patient.css"
import PlaceIcon from '@mui/icons-material/Place';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { NavLink } from 'react-router-dom';

import { useNavigate, useParams } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';

const Patient = () => {
    const [patientedit, setPatientedit] = useState({full_name:'', address:'', visiting_date:'', visit_no:''})
    const history = useNavigate()
    const {id} = useParams();

    // console.log(id)

    useEffect(() => {
        const editPatientId = async() => {
            const reqdata= await fetch(`/patients/${id}`);
            const res= reqdata.json();
            setPatientedit(await res);
        }
        editPatientId()
    },[])

    const handleEdit = (e) => {
        setPatientedit({...patientedit, [e.target.name] : e.target.value})
    }

    function handlePatientupdate(e){        
        e.preventDefault();
        fetch(`/patients/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                full_name: e.target.full_name.value,
                address: e.target.address.value,
                visiting_date: e.target.visiting_date.value,
                visit_no: e.target.visit_no.value
            }),
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
    }

  return (
    <div className='patient'>
        <div className="patientTitleContainer">
            <h1 className="patientTitle">Edit patient</h1>
            <NavLink to="/newPatient">
                <button className="patientAddButton">Create</button>
            </NavLink>            
        </div>
        <div className="patientContainer">
            <div className="patientShow">
                <div className="patientShowTop">
                    <div className="patientShowTopTitle">
                        <span className="patientShowPatientname">{patientedit.full_name}</span>
                        <span className="patientShowPatientTitle">{patientedit.visit_no}</span>
                    </div>
                </div>
                <div className="patientShowBottom">
                    <span className="patientShowTitle">Address</span>
                    <div className="patientShowInfo">
                        <PlaceIcon className="patientShowIcon" />
                        <span className="patientShowInfoTitle">{patientedit.address}</span>
                    </div> 
                    <span className="patientShowTitle">Visit Date</span> 
                    <div className="patientShowInfo">
                        <FaCalendarAlt className="patientShowIcon" />
                        <span className="patientShowInfoTitle">{patientedit.visiting_date}</span>
                    </div>                  
                </div>
            </div>
            <div className="patientUpdate">
                <span className="patientUpdateTitle">Edit</span>
                <form onSubmit={ handlePatientupdate } className="patientUpdateForm">
                    <div className="patientUpdateLeft">
                        <div className="patientUpdateItem">
                            <label>Full Name</label>
                            <input type="text" name="full_name" placeholder='John Kilonzo' className='patientUpdateInput' value={patientedit.full_name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="patientUpdateItem">
                            <label>Address</label>
                            <input type="text" name="address" placeholder='Lavington 2nd Ave' className='patientUpdateInput' value={patientedit.address} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="patientUpdateItem">
                            <label>Visit Date</label>
                            <input type="datetime-local" name="visiting_date" className='patientUpdateInput' value={patientedit.visiting_date} onChange={(e) => handleEdit(e)} />
                        </div>  
                        <div className="patientUpdateItem">
                            <label>Visit Number</label>
                            <input type="text" name="visit_no" placeholder='GN-114730-21' className='patientUpdateInput' value={patientedit.visit_no} onChange={(e) => handleEdit(e)} />
                        </div>                       
                    </div>
                    <div className="patientUpdateRight">
                        <button className="patientUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Patient