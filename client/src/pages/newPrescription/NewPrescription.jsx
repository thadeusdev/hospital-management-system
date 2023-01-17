import React, { useState} from 'react'
import "./newPrescription.css"

const NewPrescription = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    function handleAddprescription(event) {
      event.preventDefault();
      setSubmitted(true);
      const formData = new FormData(event.target);
      const prescription = {
        frequency: formData.get('frequency'),
        duration: formData.get('duration'),
        medicine_id: formData.get('medicine_id'),
        patient_id: formData.get('patient_id'),
        doctor_id: formData.get('doctor_id'),
        disease_id: formData.get('disease_id')
      };
  
      fetch('/prescriptions', {
        method: 'POST',
        body: JSON.stringify(prescription),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(newPrescription => {
          setPrescriptions([...prescriptions, newPrescription]);
        });
    }

  return (
    <div className='newPrescription'>
        <h1 className="newPrescriptionTitle">New prescription</h1>
        {submitted ? (
          <p>added successfully!</p>
        ):(
          <form onSubmit={handleAddprescription} className="newPrescriptionForm">
            <div className="newPrescriptionItem">
                <label>frequency</label>
                <input type="text" name='frequency' />
            </div>
            <div className="newPrescriptionItem">
                <label>duration</label>
                <input type="duration" name='duration' />
            </div>
            <div className="newPrescriptionItem">
                <label>medicine_id</label>
                <input type="medicine_id" name='medicine_id' />
            </div>
            <div className="newPrescriptionItem">
                <label>Patient Id</label>
                <input type="text" name='patient_id' />
            </div>
            <div className="newPrescriptionItem">
                <label>Doctor Id</label>
                <input type="text" name='doctor_id' />
            </div> 
            <div className="newPrescriptionItem">
                <label>Disease Id</label>
                <input type="text" name='disease_id' />
            </div> 
            <button className="newPrescriptionButton">Create</button>
          </form>
        )
      }
    </div>
  )
}

export default NewPrescription