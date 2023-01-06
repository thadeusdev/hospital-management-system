import React, { useState} from 'react'
import "./newDisease.css"

const NewDisease = () => {
    const [diseases, setDiseases] = useState([]);

    function handleAddDisease(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const disease = {
        name: formData.get('name'),
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
          setDiseases([...disease, newDisease]);
        });
    }

  return (
    <div className='newDisease'>
        <h1 className="newDiseaseTitle">New Disease</h1>
        <form onSubmit={handleAddDisease} className="newDiseaseForm">
            <div className="newDiseaseItem">
                <label>Name</label>
                <input type="text" placeholder='Typhoid' name='name' />
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
    </div>
  )
}

export default NewDisease