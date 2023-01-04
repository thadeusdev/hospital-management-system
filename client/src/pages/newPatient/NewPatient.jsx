import React from 'react'
import "./newPatient.css"

const NewPatient = () => {
  return (
    <div className='newPatient'>
        <h1 className="newPatientTitle">New Patient</h1>
        <form className="newPatientForm">
            <div className="newPatientItem">
                <label>Full Name</label>
                <input type="text" placeholder='John Snow' />
            </div>
            <div className="newPatientItem">
                <label>Address</label>
                <input type="text" placeholder='Lavington 2nd Ave' />
            </div>
            <div className="newPatientItem">
                <label>Visit Date</label>
                <input type="datetime-local" placeholder='2009-09-01T17:00:00.000Z' />
            </div>
            <div className="newPatientItem">
                <label>Visit Number</label>
                <input type="text" placeholder='GN-114730-21' />
            </div> 
            <button className="newPatientButton">Create</button>
        </form>
    </div>
  )
}

export default NewPatient