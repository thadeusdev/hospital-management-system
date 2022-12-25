import React, { useState} from 'react'
import { Link } from 'react-router-dom'

function AddDiseasesForm() {
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
    <div>
        <form onSubmit={handleAddDisease} className='form'>
            <h1 className='title'>Add new disease</h1>
            <div className='form-inputs'>
                <label className='form-inputs'>Name</label>
                <input 
                    className='form-input'
                    type="text"
                    name='name'
                    placeholder='Enter disease name' 
                />
            </div>            
            <div className='form-inputs'>
                <label className='form-inputs'>Symptoms</label>
                <input 
                    className='form-input'
                    type="text"
                    name='symptoms'
                    placeholder='Enter disease symptoms' 
                />
            </div>
            <div className='form-inputs'>
                <label className='form-inputs'>Severity</label>
                <input 
                    className='form-input'
                    type="text"
                    name='severity'
                    placeholder='Enter disease severity' 
                />
            </div>
            <button className='form-input-btn' type='submit'>
                Add Disease
            </button>
            <Link to="/diseases">
                <button className='form-back-btn'>
                    Go Back
                </button>
            </Link>
        </form>
    </div>
  )
}

export default AddDiseasesForm