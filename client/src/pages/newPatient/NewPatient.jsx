import React, { useState } from 'react'
import "./newPatient.css"

const NewPatient = () => {
    const [patients, setPatients] = useState([]);

    function handleAddPatient(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const patient = {
        image: formData.get('image'),
        full_name: formData.get('full_name'),
        age: formData.get('age'),
        gender: formData.get('gender'),
        address: formData.get('address'),
        visiting_date: formData.get('visiting_date'),
        visit_no: formData.get('visit_no')
      };
  
      fetch('/patients', {
        method: 'POST',
        body: JSON.stringify(patient),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(newPatient => {
          setPatients([...patients, newPatient]);
        });
    }

  return (
    <div className='newPatient'>
        <h1 className="newPatientTitle">New Patient</h1>
        <form onSubmit={handleAddPatient} className="newPatientForm">
            <div className="newPatientItem">
                <label>Image</label>
                <input type="text" placeholder='url' name='image' />
            </div>
            <div className="newPatientItem">
                <label>Full Name</label>
                <input type="text" placeholder='John Snow' name='full_name' />
            </div>
            <div className="newPatientItem">
                <label>Age</label>
                <input type="text" placeholder='42' name='age' />
            </div>
            <div className="newPatientItem">
                <label>Gender</label>
                <input type="text" placeholder='Male' name='gender' />
            </div>
            <div className="newPatientItem">
                <label>Address</label>
                <input type="text" placeholder='Lavington 2nd Ave' name='address' />
            </div>
            <div className="newPatientItem">
                <label>Visit Date</label>
                <input type="date" placeholder='2009-09-01' name='visiting_date' />
            </div>
            <div className="newPatientItem">
                <label>Visit Number</label>
                <input type="text" placeholder='GN-114730-21' name='visit_no' />
            </div> 
            <button className="newPatientButton">Create</button>
        </form>
    </div>
  )
}

export default NewPatient