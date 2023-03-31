import React, { useEffect, useState} from 'react'
import "./newDiagnose.css"

const NewDiagnose = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [diagnostics, setDiagnostics] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/patients')
    .then(res => res.json())
    .then(patients => setPatients(patients))
  }, []);

  useEffect(() => {
    fetch('/doctors')
    .then(res => res.json())
    .then(doctors => setDoctors(doctors))
  }, []);

  useEffect(() => {
    fetch('/diseases')
    .then(res => res.json())
    .then(diseases => setDiseases(diseases))
  }, []);

  const [name, setName] = useState('');
  const [patient_id, setPatient_id] = useState('');
  const [doctor_id, setDoctor_id] = useState('');
  const [disease_id, setDisease_id] = useState('');
  const [performed_at, setPerformed_at] = useState('');
  const [pulse, setPulse] = useState('');
  const [sugar, setSugar] = useState('');
  const [temperature, setTemperature] = useState('');
  const [pressure, setPressure] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true);
    fetch('/diagnostics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        patient_id: patient_id,
        doctor_id: doctor_id,
        disease_id: disease_id,
        performed_at: performed_at,
        pulse: pulse,
        sugar: sugar,
        temperature: temperature,
        pressure: pressure,
      })
    })
    .then(res => res.json())
    .then(newDiagnostic => {
      setDiagnostics([...diagnostics, newDiagnostic])
      console.log(newDiagnostic)
    })
    .catch(error => console.log(error))
  }

  return (
    <div className='newDiagnose'>
        <h1 className="newDiagnoseTitle">New Diagnose</h1>
        {submitted ? (
          <p>added successfully!</p>
        ):(
          <form className="newDiagnoseForm" onSubmit={handleSubmit}>
            <div className="newDiagnoseItem">
                <label>Name</label>
                <input type="text" placeholder='Blood test' name='name' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="newDiagnoseItem">
              <label>Patient</label>
              <select value={patient_id} onChange={e => setPatient_id(e.target.value)}>
              <option>Select</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.full_name}</option>
                ))}
              </select>
            </div>
            <div className="newDiagnoseItem">
              <label>Doctor</label>
              <select value={doctor_id} onChange={e => setDoctor_id(e.target.value)}>
              <option>Select</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.full_name}</option>
                ))}
              </select>
            </div>
            <div className="newDiagnoseItem">
              <label>Disease</label>
              <select value={disease_id} onChange={e => setDisease_id(e.target.value)}>
              <option>Select</option>
                {diseases.map(disease => (
                  <option key={disease.id} value={disease.id}>{disease.name}</option>
                ))}
              </select>
            </div>
            <div className="newDiagnoseItem">
                <label>Performed at</label>
                <input type="time" value={performed_at} onChange={e => setPerformed_at(e.target.value)} />
            </div>
            <div className="newDiagnoseItem">
                <label>Pulse</label>
                <input type="text" placeholder='100' value={pulse} onChange={e => setPulse(e.target.value)} />
            </div>
            <div className="newDiagnoseItem">
                <label>Sugar</label>
                <input type="text" placeholder='140' value={sugar} onChange={e => setSugar(e.target.value)} />
            </div>
            <div className="newDiagnoseItem">
                <label>Temperature</label>
                <input type="text" placeholder='37' value={temperature} onChange={e => setTemperature(e.target.value)} />
            </div>
            <div className="newDiagnoseItem">
                <label>Pressure</label>
                <input type="text" placeholder='80' value={pressure} onChange={e => setPressure(e.target.value)} />
            </div>
            <button className="newDiagnoseButton">Create</button>
        </form>
        )
      }
    </div>
  )
}

export default NewDiagnose