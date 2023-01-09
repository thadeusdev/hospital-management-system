import React, { useState } from 'react'
import "./newDoctor.css"

const NewDoctor = () => {
    const [doctors, setDoctors] = useState([]);

    function handleAddDoctor(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const doctor = {
          image: formData.get('image'),
          full_name: formData.get('full_name'),
          email: formData.get('email'),
          primary_practice: formData.get('primary practice'),
          secondary_practice: formData.get('secondary practice'),
          years_of_experience: formData.get('years_of_experience')
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
    <div className='newDoctor'>
        <h1 className="newDoctorTitle">New Doctor</h1>
        <form onSubmit={handleAddDoctor} className="newDoctorForm">
            <div className="newDoctorItem">
                <label>Image</label>
                <input type="text" placeholder='image url' name='image' />
            </div>
            <div className="newDoctorItem">
                <label>Full Name</label>
                <input type="text" placeholder='John Snow' name='full_name' />
            </div>
            <div className="newDoctorItem">
                <label>Email</label>
                <input type="email" placeholder='doctor1@gmail.com' name='email' />
            </div>
            <div className="newDoctorItem">
                <label>Primary Practice</label>
                <input type="text" placeholder='Family Practice Physician' name='primary practice' />
            </div>
            <div className="newDoctorItem">
                <label>Secondary Practice</label>
                <input type="text" placeholder='Internal medical doctor' name='secondary practice' />
            </div>
            <div className="newDoctorItem">
                <label>Experience(years)</label>
                <input type="text" placeholder='10' name='years_of_experience' />
            </div>
            <button className="newDoctorButton">Create</button>
        </form>
    </div>
  )
}

export default NewDoctor