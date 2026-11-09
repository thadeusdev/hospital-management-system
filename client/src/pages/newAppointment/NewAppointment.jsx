import React, { useEffect, useState} from 'react'
import "./newAppointment.css"

const NewAppointment = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointment] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/patients')
    .then(res => res.json())
    .then(patients => setPatients(patients))
  }, []);

  useEffect(() => {
    fetch('/doctors')
    .then(res => res.json())
    .then(doctors => setDoctors(doctors))
  }, []);

  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patient_id, setPatient_id] = useState('');
  const [doctor_id, setDoctor_id] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true);
    fetch('/doctor_appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notes: notes,
        date: date,
        time: time,
        patient_id: patient_id,
        doctor_id: doctor_id
      })
    })
    .then(res => res.json())
    .then(newAppointment => {
      setAppointment([...appointments, newAppointment])
      console.log(newAppointment)
    })
    .catch(error => console.log(error))
  }

  return (
    <div className='newAppointment'>
        <h1 className="newAppointmentTitle">New Appointment</h1>
        {submitted ? (
          <p>added successfully!</p>
        ):(
          <form className="newAppointmentForm" onSubmit={handleSubmit}>
            <div className="newAppointmentItem">
                <label>Notes</label>
                <input type="text" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <div className="newAppointmentItem">
                <label>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="newAppointmentItem">
                <label>Time</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} />
            </div>
            <div className="newAppointmentItem">
              <label>Patient</label>
              <select value={patient_id} onChange={e => setPatient_id(e.target.value)}>
              <option>Select</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.full_name}</option>
                ))}
              </select>
            </div>
            <div className="newAppointmentItem">
              <label>Doctor</label>
              <select value={doctor_id} onChange={e => setDoctor_id(e.target.value)}>
              <option>Select</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.full_name}</option>
                ))}
              </select>
            </div> 
            <button className="newAppointmentButton">Create</button>
          </form>
        )
      }
    </div>
  )
}

export default NewAppointment