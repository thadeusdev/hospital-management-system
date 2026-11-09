import React, { useEffect, useState} from 'react'
import "./newPrescription.css"

const NewPrescription = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
      fetch('/medicines')
      .then(res => res.json())
      .then(medicines => setMedicines(medicines))
    }, []);

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

    const [frequency, setFrequency] = useState('');
    const [duration, setDuration] = useState('');
    const [medicine_id, setMedicine_id] = useState('');
    const [disease_id, setDisease_id] = useState('');
    const [patient_id, setPatient_id] = useState('');
    const [doctor_id, setDoctor_id] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault()
      setSubmitted(true);
      fetch('/prescriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          frequency: frequency,
          duration: duration,
          medicine_id: medicine_id,
          disease_id: disease_id,
          patient_id: patient_id,
          doctor_id: doctor_id
        })
      })
      .then(res => res.json())
      .then(newPrescription => {
        setPrescriptions([...prescriptions, newPrescription])
        console.log(newPrescription)
      })
      .catch(error => console.log(error))
    }

  return (
    <div className='newPrescription'>
        <h1 className="newPrescriptionTitle">New prescription</h1>
        {submitted ? (
          <p>added successfully!</p>
        ):(
          <form className="newPrescriptionForm" onSubmit={handleSubmit}>
            <div className="newPrescriptionItem">
                <label>Frequency</label>
                <input type="text" value={frequency} onChange={e => setFrequency(e.target.value)} />
            </div>
            <div className="newPrescriptionItem">
                <label>Duration</label>
                <input type="duration" value={duration} onChange={e => setDuration(e.target.value)} />
            </div>
            <div className="newPrescriptionItem">
              <label>Medicine</label>
              <select value={medicine_id} onChange={e => setMedicine_id(e.target.value)}>
              <option>Select</option>
                {medicines.map(medicine => (
                  <option key={medicine.id} value={medicine.id}>{medicine.name}</option>
                ))}
              </select>
            </div>
            <div className="newPrescriptionItem">
              <label>Patient</label>
              <select value={patient_id} onChange={e => setPatient_id(e.target.value)}>
              <option>Select</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.full_name}</option>
                ))}
              </select>
            </div>
            <div className="newPrescriptionItem">
              <label>Doctor</label>
              <select value={doctor_id} onChange={e => setDoctor_id(e.target.value)}>
              <option>Select</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.full_name}</option>
                ))}
              </select>
            </div> 
            <div className="newPrescriptionItem">
              <label>Disease</label>
              <select value={disease_id} onChange={e => setDisease_id(e.target.value)}>
              <option>Select</option>
                {diseases.map(disease => (
                  <option key={disease.id} value={disease.id}>{disease.name}</option>
                ))}
              </select>
            </div> 
            <button className="newPrescriptionButton">Create</button>
          </form>
        )
      }
    </div>
  )
}

export default NewPrescription