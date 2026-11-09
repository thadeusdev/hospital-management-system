import React, { useEffect, useState } from 'react'
import "./appointment.css"
import { NavLink, useParams } from 'react-router-dom';
import { Accessible, AccessTime } from '@mui/icons-material';
import { FaUserMd } from 'react-icons/fa';

const Appointment = () => {

    const [singleAppointment, setSingleAppointment] = useState({notes: '', date: '', time: '', patient_id: '', doctor_id: '',});
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const {id} = useParams()
    // console.log(id)

    useEffect(() => {
        fetch(`/doctor_appointments/${id}`)
        .then(res => res.json())
        .then(singleAppointment => setSingleAppointment(singleAppointment))
    }, [id])

    useEffect(() => {
        fetch('/doctors')
        .then(res => res.json())
        .then(doctors => setDoctors(doctors))
    }, []);

    useEffect(() => {
        fetch('/patients')
        .then(res => res.json())
        .then(patients => setPatients(patients))
    }, []);

    const handleEdit = (e) => {
        setSingleAppointment({...singleAppointment, [e.target.name] : e.target.value})
    }

    function handleUpdate(e){        
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
                doctor_id: e.target.doctor_id.value,
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
                        <span className="appointmentShowAppointmentname">{singleAppointment.notes}</span>
                        <span className="appointmentShowAppointmentTitle">{singleAppointment.date}</span>
                    </div>
                </div>
                <div className="appointmentShowBottom">
                    <span className="appointmentShowTitle">Time</span>
                    <div className="appointmentShowInfo">
                        <AccessTime className="appointmentShowIcon" />
                        <span className="appointmentShowInfoTitle">{singleAppointment.time}</span>
                    </div> 
                    <span className="appointmentShowTitle">Patient</span> 
                    <div className="appointmentShowInfo">
                        <Accessible className="appointmentShowIcon" />
                        <span className="appointmentShowInfoTitle">{singleAppointment.patient_name}</span>
                    </div> 
                    <span className="appointmentShowTitle">Doctor</span> 
                    <div className="appointmentShowInfo">
                        <FaUserMd className="appointmentShowIcon" />
                        <span className="appointmentShowInfoTitle">{singleAppointment.doctor_name}</span>
                    </div>                  
                </div>
            </div>
            <div className="appointmentUpdate">
                <span className="appointmentUpdateTitle">Edit</span>
                <form className="appointmentUpdateForm" onSubmit={handleUpdate}>
                    <div className="appointmentUpdateLeft">
                        <div className="appointmentUpdateItem">
                            <label>Notes</label>
                            <input type="text" name="notes" className='appointmentUpdateInput' value={singleAppointment.notes} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="appointmentUpdateItem">
                            <label>Date</label>
                            <input type="date" name="date" className='appointmentUpdateInput' value={singleAppointment.date} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="appointmentUpdateItem">
                            <label>Time</label>
                            <input type="text" name="time" className='appointmentUpdateInput' value={singleAppointment.time} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="appointmentUpdateItem">
                            <label>Patient</label>
                            <select name="patient_id" value={singleAppointment.patient_id} onChange={(e) => handleEdit(e)}>
                                {patients.map(patient => (
                                    <option key={patient.id} value={patient.id}>{patient.full_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="appointmentUpdateItem">
                            <label>Doctor</label>
                            <select name="doctor_id" value={singleAppointment.doctor_id} onChange={(e) => handleEdit(e)}>
                                {doctors.map(doctor => (
                                    <option key={doctor.id} value={doctor.id}>{doctor.full_name}</option>
                                ))}
                            </select>
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