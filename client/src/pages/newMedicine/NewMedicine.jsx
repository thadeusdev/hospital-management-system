import React, { useEffect, useState } from 'react'
import "./newMedicine.css"

const NewMedicine = () => {
    const [medicines, setMedicines] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
      fetch('/patients')
      .then(res => res.json())
      .then(patients => setPatients(patients))
    }, []);

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [patient_id, setPatient_id] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [is_acidic, setIs_acidic] = useState('');
    const [infant_safe, setInfant_safe] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault()
      // setSubmitted(true);
      fetch('/medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image,
          name: name,
          dosage: dosage,
          patient_id: patient_id,
          description: description,
          category: category,
          is_acidic: is_acidic,
          infant_safe: infant_safe
        })
      })
      .then(res => res.json())
      .then(newMedicine => {
        setMedicines([...medicines, newMedicine]);
        console.log(newMedicine);
        setSubmitted(true);
      })
      .catch(error => console.log(error))
    }

  return (
    <div className='newMedicine'>
        <h1 className="newMedicineTitle">New Medicine</h1>
        {submitted ? (
          <p>added seccessfully!</p>
        ):(
          <form className="newMedicineForm" onSubmit={handleSubmit}>
            <div className="newMedicineItem">
                <label>Image</label>
                <input type="text" placeholder='url' value={image} onChange={e => setImage(e.target.value)} />
            </div>
            <div className="newMedicineItem">
                <label>Name</label>
                <input type="text" placeholder='Asprine' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="newMedicineItem">
                <label>Dosage</label>
                <input type="text" placeholder='200ml' value={dosage} onChange={e => setDosage(e.target.value)} />
            </div>
            <div className="newMedicineItem">
              <label>Patient</label>
              <select value={patient_id} onChange={e => setPatient_id(e.target.value)}>
              <option>Select</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.full_name}</option>
                ))}
              </select>
            </div>
            <div className="newMedicineItem">
                <label>Description</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="newMedicineItem">
                <label>Category</label>
                <input type="text" placeholder='Tablet' value={category} onChange={e => setCategory(e.target.value)} />
            </div>
            <div className="newMedicineItem">
                <label>Acidic?</label>
                <select value={is_acidic} onChange={e => setIs_acidic(e.target.value)} className="newMedicineSelect">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <div className="newMedicineItem">
                <label>Infant Safe?</label>
                <select value={infant_safe} onChange={e => setInfant_safe(e.target.value)} className="newMedicineSelect">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <button className="newMedicineButton">Create</button>
        </form>
        )
      }
    </div>
  )
}

export default NewMedicine