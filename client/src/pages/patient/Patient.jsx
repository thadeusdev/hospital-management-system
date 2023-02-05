import React, { useState, useEffect } from 'react'
import "./patient.css"
import PlaceIcon from '@mui/icons-material/Place';
import PublishIcon from '@mui/icons-material/Publish';
import { NavLink } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import { Verified } from '@mui/icons-material';

const Patient = () => {
    const [patientedit, setPatientedit] = useState({image:'', full_name:'', age:'', gender:'', address:'', visiting_date:'', visit_no:''})
    const {id} = useParams();

    // console.log(id)

    useEffect(() => {
        const editPatientId = async() => {
            const reqdata= await fetch(`/doctors/${id}/patients/${id}`);
            const res= reqdata.json();
            setPatientedit(await res);
        }
        editPatientId()
    },[id])

    const handleEdit = (e) => {
        setPatientedit({...patientedit, [e.target.name] : e.target.value})
    }

    function handlePatientupdate(e){        
        e.preventDefault();
        fetch(`/doctors/${id}/patients/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                image: e.target.image.value,
                full_name: e.target.full_name.value,
                age: e.target.age.value,
                gender: e.target.gender.value,
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
                    <img src={patientedit.image} alt="" className="patientShowImg" />
                    <div className="patientShowTopTitle">
                        <span className="patientShowPatientname">{patientedit.full_name}</span>
                        <span className="patientShowPatientTitle">{patientedit.age}</span>
                    </div>
                </div>
                <div className="patientShowBottom">
                    <span className="patientShowTitle">Gender</span>
                    <div className="patientShowInfo">
                        <Verified className="patientShowIcon" />
                        <span className="patientShowInfoTitle">{patientedit.gender}</span>
                    </div> 
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
                    <span className="patientShowTitle">Visit No:</span>
                    <div className="patientShowInfo">
                        <FaCalendarAlt className="patientShowIcon" />
                        <span className="patientShowInfoTitle">{patientedit.visit_no}</span>
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
                            <label>Age</label>
                            <input type="text" name="age" placeholder='Lavington 2nd Ave' className='patientUpdateInput' value={patientedit.age} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="patientUpdateItem">
                            <label>Gender</label>
                            <input type="text" name="gender" placeholder='Lavington 2nd Ave' className='patientUpdateInput' value={patientedit.gender} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="patientUpdateItem">
                            <label>Address</label>
                            <input type="text" name="address" placeholder='Lavington 2nd Ave' className='patientUpdateInput' value={patientedit.address} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="patientUpdateItem">
                            <label>Visit Date</label>
                            <input type="date" name="visiting_date" className='patientUpdateInput' value={patientedit.visiting_date} onChange={(e) => handleEdit(e)} />
                        </div>  
                        <div className="patientUpdateItem">
                            <label>Visit Number</label>
                            <input type="text" name="visit_no" placeholder='GN-114730-21' className='patientUpdateInput' value={patientedit.visit_no} onChange={(e) => handleEdit(e)} />
                        </div>                       
                    </div>
                    <div className="patientUpdateRight">
                        <div className="patientUpdateUpload">
                            <img className="patientUpdateImg" src={patientedit.image} alt="" />
                            <label htmlFor="file"><PublishIcon className='patientUpdateIcon' /></label>
                            <input type="file" id='file' style={{display: "none"}}  name="image" src={patientedit.image} onChange={(e) => handleEdit(e)} />
                        </div>
                        <button className="patientUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Patient