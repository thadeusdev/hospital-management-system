import React, { useState} from 'react'
import "./newDiagnose.css"

const NewDiagnose = () => {
    const [setDiagnoses] = useState([]);

    function handleAddDiagnose(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const diagnose = {
        notes: formData.get('notes'),
        disease_id: formData.get('disease_id'),
        patient_id: formData.get('patient_id'),
        diagnosed_on: formData.get('diagnosed_on'),
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
          setDiagnoses([...diagnose, newDiagnose]);
        });
    }

  return (
    <div className='newDiagnose'>
        <h1 className="newDiagnoseTitle">New Diagnose</h1>
        <form onSubmit={handleAddDiagnose} className="newDiagnoseForm">
            <div className="newDiagnoseItem">
                <label>Notes</label>
                <input type="text" placeholder='Chronic condition' name='notes' />
            </div>
            <div className="newDiagnoseItem">
                <label>Disease id</label>
                <input type="text" placeholder='100' name="disease_id" />
            </div>
            <div className="newDiagnoseItem">
                <label>Patient id</label>
                <input type="text" placeholder='100' name="patient_id" />
            </div>
            <div className="newDiagnoseItem">
                <label>Diagnosed on</label>
                <input type="datetime-local" placeholder='100' name="diagnosed_on" />
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
    </div>
  )
}

export default NewDiagnose