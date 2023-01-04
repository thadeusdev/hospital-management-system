import React from 'react'
import "./newDoctor.css"

const NewDoctor = () => {
  return (
    <div className='newDoctor'>
        <h1 className="newDoctorTitle">New Doctor</h1>
        <form className="newDoctorForm">
            <div className="newDoctorItem">
                <label>Full Name</label>
                <input type="text" placeholder='John Snow' />
            </div>
            <div className="newDoctorItem">
                <label>Primary Practice</label>
                <input type="text" placeholder='Family Practice Physician' />
            </div>
            <div className="newDoctorItem">
                <label>Secondary Practice</label>
                <input type="text" placeholder='Internal medical doctor' />
            </div>
            <button className="newDoctorButton">Create</button>
        </form>
    </div>
  )
}

export default NewDoctor