import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function AddPatientForm() {
    const [patients, setPatients] = useState([]);

    function handleAddPatient(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const patient = {
        full_name: formData.get('name'),
        address: formData.get('address'),
        visiting_date: formData.get('visiting date'),
        visit_no: formData.get('visit no')
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
    <div>
        <form onSubmit={handleAddPatient} className='form'>            
            <h1 className='title'>Add new patient</h1>
            <div className='form-inputs'>
                <label className='form-inputs'>Full Name</label>
                <input 
                    className='form-input'
                    type="text"
                    name='name'
                    placeholder='Enter full name' 
                />
            </div>
            <div className='form-inputs'>
                <label className='form-inputs'>Address</label>
                <input 
                    className='form-input'
                    type="text"
                    name='address'
                    placeholder='Enter address' 
                />
            </div>
            <div className='form-inputs'>
                <label className='form-inputs'>Visiting date</label>
                <input 
                    className='form-input'
                    type="datetime-local"
                    name='visiting date'
                    placeholder='Enter visiting date' 
                />
            </div>
            <div className='form-inputs'>
                <label className='form-inputs'>Visit No.</label>
                <input 
                    className='form-input'
                    type="visit"
                    name='visit no.'
                    placeholder='Enter visit no.' 
                />
            </div>                      
            <button className='form-input-btn' type='submit'>
                Add Patient
            </button>
            <Link to="/patients">
                <button className='form-back-btn'>
                    Go Back
                </button>
            </Link>            
        </form>
    </div>
  )
}

export default AddPatientForm