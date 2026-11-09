import React, { useState } from 'react'
import "./newDoctor.css"

const NewDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    // const [file, setFile] = useState(null);

    function handleAddDoctor(event) {
        event.preventDefault();
        setSubmitted(true);
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

      // const upload = (file) => {
      //   const formData = new formData();
      //   formData.append("file", file);
      //   formData.append("upload_preset", 'hospital-management-system');

      //   fetch("https://api.cloudinary.com/vi_1/dp9nfmkoo/image", {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   })
      //   .then(res => res.json())
      //   .then(data => console.log(data))
      // }

  return (
    <div className='newDoctor'>
        <h1 className="newDoctorTitle">New Doctor</h1>
        {submitted ? (
          <p>added successfully</p>
        ):(
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
        )
      }
    </div>
  )
}

export default NewDoctor