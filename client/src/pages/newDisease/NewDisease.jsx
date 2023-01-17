import React, { useState} from 'react'
import "./newDisease.css"

const NewDisease = () => {
    const [diseases, setDiseases] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    function handleAddDisease(event) {
      event.preventDefault();
      setSubmitted(true);
      const formData = new FormData(event.target);
      const disease = {
        name: formData.get('name'),
        patient_id: formData.get('patient_id'),
        symptoms: formData.get('symptoms'),
        severity: formData.get('severity')
      };
  
      fetch('/diseases', {
        method: 'POST',
        body: JSON.stringify(disease),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(newDisease => {
          setDiseases([...diseases, newDisease]);
        });
    }

  return (
    <div className='newDisease'>
        <h1 className="newDiseaseTitle">New Disease</h1>
        {submitted ? (
          <p>added successfully!</p>
        ):(
          <form onSubmit={handleAddDisease} className="newDiseaseForm">
            <div className="newDiseaseItem">
                <label>Name</label>
                <input type="text" placeholder='Typhoid' name='name' />
            </div>
            <div className="newDiseaseItem">
                <label>Patient Id</label>
                <input type="text" placeholder='fever, headache' name='patient_id' />
            </div>
            <div className="newDiseaseItem">
                <label>Symptoms</label>
                <input type="text" placeholder='fever, headache' name='symptoms' />
            </div>
            <div className="newDiseaseItem">
                <label>Severity</label>
                <input type="text" placeholder='High' name='severity' />
            </div> 
            <button className="newDiseaseButton">Create</button>
        </form>
        )
      }
    </div>
  )
}

export default NewDisease