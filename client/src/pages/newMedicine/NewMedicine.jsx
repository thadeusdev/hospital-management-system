import React, { useState, useEffect} from 'react'
import "./newMedicine.css"

const NewMedicine = () => {
    const [medicines, setMedicines] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    function handleAddMedicine(event) {
      event.preventDefault();
      setSubmitted(true);
      const formData = new FormData(event.target);
      const medicine = {
        image: formData.get('image'),
        name: formData.get('name'),
        dosage: formData.get('dosage'),
        patient_id: formData.get('patient_id'),
        description: formData.get('description'),
        category: formData.get('category'),
        is_acidic: formData.get('is_acidic'),
        infant_safe: formData.get('infant_safe'),
      };
  
      fetch('/medicines', {
        method: 'POST',
        body: JSON.stringify(medicine),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // fetch(`/medicines/${id}/patients/${id}`, {
      //   method: 'POST',
      //   body: JSON.stringify(medicine),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
        .then(response => response.json())
        .then(newMedicine => {
          setMedicines([...medicines, newMedicine]);
          console.log(newMedicine)
        });
    }

  return (
    <div className='newMedicine'>
        <h1 className="newMedicineTitle">New Medicine</h1>
        {submitted ? (
          <p>added seccessfully!</p>
        ):(
          <form onSubmit={handleAddMedicine} className="newMedicineForm">
            <div className="newMedicineItem">
                <label>Image</label>
                <input type="text" placeholder='url' name='image' />
            </div>
            <div className="newMedicineItem">
                <label>Name</label>
                <input type="text" placeholder='Asprine' name='name' />
            </div>
            <div className="newMedicineItem">
                <label>Dosage</label>
                <input type="text" placeholder='200ml' name='dosage' />
            </div>
            <div className="newMedicineItem">
                <label>Patient</label>
                <input type="text" name='patient_id' />
            </div>
            <div className="newMedicineItem">
                <label>Description</label>
                <input type="text" name='description' />
            </div>
            <div className="newMedicineItem">
                <label>Category</label>
                <input type="text" placeholder='Tablet' name='category' />
            </div>
            <div className="newMedicineItem">
                <label>Acidic?</label>
                <select name="is_acidic" id="acidic" className="newMedicineSelect">
                    <option value="true" name="is_acidic">True</option>
                    <option value="false" name="is_acidic">False</option>
                </select>
            </div>
            <div className="newMedicineItem">
                <label>Infant Safe?</label>
                <select name="infant_safe" id="infant_safe" className="newMedicineSelect">
                    <option value="true" name="infant_safe">True</option>
                    <option value="false" name="infant_safe">False</option>
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