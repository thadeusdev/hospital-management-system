import React, { useState, useEffect } from 'react'
import "./appointment.css"
import VerifiedIcon from '@mui/icons-material/Verified';
import { NavLink } from 'react-router-dom';

import { useNavigate, useParams } from 'react-router-dom';

const Appointment = () => {
    const [appointmentedit, setAppointmentedit] = useState({notes:'', patient_id:'', doctor_id:''})
    const history = useNavigate()
    const {id} = useParams(); 

    // console.log(id)

    useEffect(() => {
        const editAppointmentId = async() => {
            const reqdata= await fetch(`/doctor_appointments/${id}`);
            const res= reqdata.json();
            setAppointmentedit(await res);
        }
        editAppointmentId()
    },[])

    const handleEdit = (e) => {
        setAppointmentedit({...appointmentedit, [e.target.name] : e.target.value})
    }

    function handleAppointmentupdate(e){        
        e.preventDefault();
        fetch(`/doctor_appointments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                notes: e.target.notes.value,
                patient_id: e.target.patient_id.value,
                doctor_id: e.target.doctor_id.value
            }),
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
    }

  return (
    <div className='appointment'>
        <div className="appointmentTitleContainer">
            <h1 className="appointmentTitle">Edit appointment</h1>
            <NavLink to="/newappointment">
                <button className="appointmentAddButton">Create</button>
            </NavLink>            
        </div>
        <div className="appointmentContainer">
            <div className="appointmentShow">
                <div className="appointmentShowTop">
                    <div className="appointmentShowTopTitle">
                        <span className="appointmentShowAppointmentname">{appointmentedit.notes}</span>
                        <span className="appointmentShowAppointmentTitle">{appointmentedit.patient_id}</span>
                    </div>
                </div>
                <div className="appointmentShowBottom">
                    <span className="appointmentShowTitle">Appointment</span>
                    <div className="appointmentShowInfo">
                        <VerifiedIcon className="appointmentShowIcon" />
                        <span className="appointmentShowInfoTitle">{appointmentedit.notes}</span>
                    </div> 
                    <span className="appointmentShowTitle">Patient Id</span> 
                    <div className="appointmentShowInfo">
                        <VerifiedIcon className="appointmentShowIcon" />
                        <span className="appointmentShowInfoTitle">{appointmentedit.patient_id}</span>
                    </div> 
                    <span className="appointmentShowTitle">Doctor Id</span> 
                    <div className="appointmentShowInfo">
                        <VerifiedIcon className="appointmentShowIcon" />
                        <span className="appointmentShowInfoTitle">{appointmentedit.doctor_id}</span>
                    </div>                  
                </div>
            </div>
            <div className="appointmentUpdate">
                <span className="appointmentUpdateTitle">Edit</span>
                <form onSubmit={ handleAppointmentupdate } className="appointmentUpdateForm">
                    <div className="appointmentUpdateLeft">
                        <div className="appointmentUpdateItem">
                            <label>Notes</label>
                            <input type="text" name="notes" className='appointmentUpdateInput' value={appointmentedit.notes} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="appointmentUpdateItem">
                            <label>Patient Id</label>
                            <input type="text" name="patient_id" className='appointmentUpdateInput' value={appointmentedit.patient_id} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="appointmentUpdateItem">
                            <label>Doctor Id</label>
                            <input type="text" name="doctor_id" className='appointmentUpdateInput' value={appointmentedit.doctor_id} onChange={(e) => handleEdit(e)} />
                        </div>                                                 
                    </div>
                    <div className="appointmentUpdateRight">
                        <button className="appointmentUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Appointment