import React, { useEffect, useState} from 'react'
import "./newDisease.css"

const NewDisease = () => {
  const [patients, setPatients] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/patients')
    .then(res => res.json())
    .then(patients => setPatients(patients))
  }, [])

  const [name, setName] = useState('');
  const [patient_id, setPatient_id] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [severity, setSeverity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true);
    fetch('/diseases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        symptoms: symptoms,
        severity: severity,
        patient_id: patient_id
      })
    })
    .then(res => res.json())
    .then(newDisease => {
      setDiseases([...diseases, newDisease])
      console.log(newDisease)
    })
    .catch(error => console.log(error))
  }

  return (
    <div className='newDisease'>
        <h1 className="newDiseaseTitle">New Disease</h1>
        {submitted ? (
          <p>added successfully!</p>
        ):(
          <form className="newDiseaseForm" onSubmit={handleSubmit}>
            <div className="newDiseaseItem">
                <label>Name</label>
                <input type="text" placeholder='Typhoid' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="newDiseaseItem">
              <label>Patient</label>
              <select value={patient_id} onChange={e => setPatient_id(e.target.value)}>
              <option>Select</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.full_name}</option>
                ))}
              </select>
            </div>
            <div className="newDiseaseItem">
                <label>Symptoms</label>
                <input type="text" placeholder='fever, headache' value={symptoms} onChange={e => setSymptoms(e.target.value)} />
            </div>
            <div className="newDiseaseItem">
                <label>Severity</label>
                <input type="text" placeholder='High' value={severity} onChange={e => setSeverity(e.target.value)} />
            </div> 
            <button className="newDiseaseButton">Create</button>
        </form>
        )
      }
    </div>
  )
}

export default NewDisease