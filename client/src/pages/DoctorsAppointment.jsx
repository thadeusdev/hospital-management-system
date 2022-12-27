import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function DoctorsAppointment() {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch('/doctor_appointments')
        .then(res => res.json())
        .then((appointments => setAppointments(appointments)))
    }, [])
  return (
    <div className="tables">        
        <div className="last-appointments">
            <div className="heading">
                <h2>Appointments</h2>
                <Link to="/addDoctor">
                    <button className="btn">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        Add Appointment
                    </button>
                </Link>                
            </div>            
            <table className="appointments">
                <thead>
                    <tr>
                        <th>Notes</th>
                        <th>Doctor</th>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>                 
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>                        
                            <td>{appointment.notes}</td>
                            <td>{appointment.doctor.full_name}</td>
                            <td>{appointment.patient.full_name}</td>
                            <td>{appointment.patient.visiting_date}</td>
                            <td>
                                <i className="far fa-eye" />
                                <Link to="/updateDoctor">
                                    <i className="far fa-edit" />
                                </Link>                                
                                <i className="far fa-trash-alt" />
                            </td>
                        </tr> 
                    ))}                              
                </tbody>              
                 
            </table>           
        </div>        
    </div> 
  )
}

export default DoctorsAppointment