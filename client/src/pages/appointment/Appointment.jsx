import React, { useState, useEffect } from 'react'
import "./appointment.css"
import VerifiedIcon from '@mui/icons-material/Verified';
import { NavLink } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const Appointment = () => {
    const [appointmentedit, setAppointmentedit] = useState({notes:'', date:'', time:'', patient_id:'', doctor_id:''})
    const {id} = useParams(); 

    // console.log(id)

    useEffect(() => {
        const editAppointmentId = async() => {
            const reqdata= await fetch(`/doctor_appointments/${id}`);
            const res= reqdata.json();
            setAppointmentedit(await res);
        }
        editAppointmentId()
    },[id])

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
                date: e.target.date.value,
                time: e.target.time.value,
                patient_id: e.target.patient_id.value,
                doctor_id: e.target.doctor_id.value
            }),
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
    }

    const [patientedit, setPatientedit] = useState([])
    useEffect(() => {
        const editPatientId = async() => {
            const reqdata= await fetch(`/doctor_appointments/${id}/patients/${id}`);
            const res= reqdata.json();
            setPatientedit(await res);
        }
        editPatientId()
    },[id])

    const [doctoredit, setdoctoredit] = useState([])
    useEffect(() => {
        const editdoctorId = async() => {
            const reqdata= await fetch(`/doctor_appointments/${id}/doctors/${id}`);
            const res= reqdata.json();
            setdoctoredit(await res);
        }
        editdoctorId()
    },[id])

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
                        <span className="appointmentShowAppointmentTitle">{appointmentedit.date}</span>
                    </div>
                </div>
                <div className="appointmentShowBottom">
                    <span className="appointmentShowTitle">Time</span>
                    <div className="appointmentShowInfo">
                        <VerifiedIcon className="appointmentShowIcon" />
                        <span className="appointmentShowInfoTitle">{appointmentedit.time}</span>
                    </div> 
                    <span className="appointmentShowTitle">Patient</span> 
                    <div className="appointmentShowInfo">
                        <VerifiedIcon className="appointmentShowIcon" />
                        <span className="appointmentShowInfoTitle">{patientedit.full_name}</span>
                    </div> 
                    <span className="appointmentShowTitle">Doctor</span> 
                    <div className="appointmentShowInfo">
                        <VerifiedIcon className="appointmentShowIcon" />
                        <span className="appointmentShowInfoTitle">{doctoredit.full_name}</span>
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
                            <label>Date</label>
                            <input type="date" name="date" className='appointmentUpdateInput' value={appointmentedit.date} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="appointmentUpdateItem">
                            <label>Time</label>
                            <input type="time" name="time" className='appointmentUpdateInput' value={appointmentedit.time} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="appointmentUpdateItem">
                            <label>Patient</label>
                            <input type="text" name="patient_id" className='appointmentUpdateInput' value={patientedit.full_name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="appointmentUpdateItem">
                            <label>Doctor</label>
                            <input type="text" name="doctor_id" className='appointmentUpdateInput' value={doctoredit.full_name} onChange={(e) => handleEdit(e)} />
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