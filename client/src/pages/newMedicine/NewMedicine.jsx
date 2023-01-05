import React from 'react'
import "./newMedicine.css"

const NewMedicine = () => {
  return (
    <div className='newMedicine'>
        <h1 className="newMedicineTitle">New Medicine</h1>
        <form className="newMedicineForm">
            <div className="newMedicineItem">
                <label>Image</label>
                <input type="text" placeholder='url' />
            </div>
            <div className="newMedicineItem">
                <label>Name</label>
                <input type="text" placeholder='Asprine' />
            </div>
            <div className="newMedicineItem">
                <label>Description</label>
                <input type="text" placeholder='for headache' />
            </div>
            <div className="newMedicineItem">
                <label>Category</label>
                <input type="text" placeholder='Tablet' />
            </div>
            <div className="newMedicineItem">
                <label>Acidic?</label>
                <select name="acidic" id="acidic" className="newMedicineSelect">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <div className="newMedicineItem">
                <label>Infant Safe?</label>
                <select name="infant_safe" id="infant_safe" className="newMedicineSelect">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <div className="newMedicineItem">
                <label>Patient</label>
                <input type="text" placeholder='John Snow' />
            </div>
            <div className="newMedicineItem">
                <label>Disease</label>
                <input type="text" placeholder='Typhoid' />
            </div>
            <button className="newMedicineButton">Create</button>
        </form>
    </div>
  )
}

export default NewMedicine