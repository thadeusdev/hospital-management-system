import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function AddDoctorForm() {
    const [doctors, setDoctors] = useState([]);

  function handleAddDoctor(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const doctor = {
      full_name: formData.get('name'),
      primary_practice: formData.get('primary practice'),
      secondary_practice: formData.get('secondary practice')
    };

    fetch('/doctors', {
      method: 'POST',
      body: JSON.stringify(doctor),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(newDoctor => {
        setDoctors([...doctors, newDoctor]);
      });
  }
  return (
    <div>
        <form onSubmit={handleAddDoctor} className='form'>
            <h1 className='title'>Add new doctor</h1>
            <div className='form-inputs'>
                <label className='form-inputs'>First Name</label>
                <input 
                    className='form-input'
                    type="text"
                    name='name'
                    placeholder='Enter full name' 
                />
            </div>            
            <div className='form-inputs'>
                <label className='form-inputs'>Primary Practice</label>
                <input 
                    className='form-input'
                    type="text"
                    name='primary practice'
                    placeholder='Enter primary practice' 
                />
            </div>
            <div className='form-inputs'>
                <label className='form-inputs'>Secondary Practice</label>
                <input 
                    className='form-input'
                    type="text"
                    name='secondary practice'
                    placeholder='Enter secondary practice' 
                />
            </div>
            <button className='form-input-btn' type='submit'>
                Add Doctor
            </button>
            <Link to="/doctors">
                <button className='form-back-btn'>
                    Go Back
                </button>
            </Link>
        </form>
    </div>
  )
}

export default AddDoctorForm