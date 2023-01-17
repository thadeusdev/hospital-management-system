import React, { useState} from 'react'
import "./newDiagnose.css"

const NewDiagnose = () => {
    const [diagnoses, setDiagnoses] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    function handleAddDiagnose(event) {
      event.preventDefault();
      setSubmitted(true);
      const formData = new FormData(event.target);
      const diagnose = {
        name: formData.get('name'),
        patient_id: formData.get('patient_id'),
        doctor_id: formData.get('doctor_id'),
        disease_id: formData.get('disease_id'),
        performed_at: formData.get('performed_at'),
        pulse: formData.get('pulse'),
        sugar: formData.get('sugar'),
        temperature: formData.get('temperature'),
        pressure: formData.get('pressure')
      };
  
      fetch('/diagnostics', {
        method: 'POST',
        body: JSON.stringify(diagnose),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(newDiagnose => {
          setDiagnoses([...diagnoses, newDiagnose]);
        });
    }

  return (
    <div className='newDiagnose'>
        <h1 className="newDiagnoseTitle">New Diagnose</h1>
        {submitted ? (
          <p>added successfully!</p>
        ):(
          <form onSubmit={handleAddDiagnose} className="newDiagnoseForm">
            <div className="newDiagnoseItem">
                <label>Name</label>
                <input type="text" placeholder='Blood test' name='name' />
            </div>
            <div className="newDiagnoseItem">
                <label>Patient Id</label>
                <input type="text" placeholder='1' name="patient_id" />
            </div>
            <div className="newDiagnoseItem">
                <label>Doctor id</label>
                <input type="text" placeholder='1' name="doctor_id" />
            </div>
            <div className="newDiagnoseItem">
                <label>Disease id</label>
                <input type="text" placeholder='1' name="disease_id" />
            </div>
            <div className="newDiagnoseItem">
                <label>Performed at</label>
                <input type="datetime-local" name="performed_at" />
            </div>
            <div className="newDiagnoseItem">
                <label>Pulse</label>
                <input type="text" placeholder='100' name="pulse" />
            </div>
            <div className="newDiagnoseItem">
                <label>Sugar</label>
                <input type="text" placeholder='140' name="sugar" />
            </div>
            <div className="newDiagnoseItem">
                <label>Temperature</label>
                <input type="text" placeholder='37' name='temperature' />
            </div>
            <div className="newDiagnoseItem">
                <label>Pressure</label>
                <input type="text" placeholder='80' name='pressure' />
            </div>
            <button className="newDiagnoseButton">Create</button>
        </form>
        )
      }
    </div>
  )
}

export default NewDiagnose