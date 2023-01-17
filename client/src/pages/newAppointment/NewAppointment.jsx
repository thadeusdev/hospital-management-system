import React, { useState} from 'react'
import "./newAppointment.css"

const NewAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    function handleAddappointment(event) {
      event.preventDefault();
      setSubmitted(true);
      const formData = new FormData(event.target);
      const appointment = {
        notes: formData.get('notes'),
        date: formData.get('date'),
        time: formData.get('time'),
        patient_id: formData.get('patient_id'),
        doctor_id: formData.get('doctor_id')
      };
  
      fetch('/doctor_appointments', {
        method: 'POST',
        body: JSON.stringify(appointment),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(newAppointment => {
          setAppointments([...appointments, newAppointment]);
        });
    }

  return (
    <div className='newAppointment'>
        <h1 className="newAppointmentTitle">New Appointment</h1>
        {submitted ? (
          <p>added successfully!</p>
        ):(
          <form onSubmit={handleAddappointment} className="newAppointmentForm">
            <div className="newAppointmentItem">
                <label>Notes</label>
                <input type="text" name='notes' />
            </div>
            <div className="newAppointmentItem">
                <label>Date</label>
                <input type="date" name='date' />
            </div>
            <div className="newAppointmentItem">
                <label>Time</label>
                <input type="time" name='time' />
            </div>
            <div className="newAppointmentItem">
                <label>Patient Id</label>
                <input type="text" name='patient_id' />
            </div>
            <div className="newAppointmentItem">
                <label>Doctor Id</label>
                <input type="text" name='doctor_id' />
            </div> 
            <button className="newAppointmentButton">Create</button>
          </form>
        )
      }
    </div>
  )
}

export default NewAppointment