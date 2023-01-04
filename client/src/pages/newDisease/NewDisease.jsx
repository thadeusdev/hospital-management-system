import React from 'react'
import "./newDisease.css"

const NewDisease = () => {
  return (
    <div className='newDisease'>
        <h1 className="newDiseaseTitle">New Disease</h1>
        <form className="newDiseaseForm">
            <div className="newDiseaseItem">
                <label>Name</label>
                <input type="text" placeholder='Typhoid' />
            </div>
            <div className="newDiseaseItem">
                <label>Symptoms</label>
                <input type="text" placeholder='fever, headache' />
            </div>
            <div className="newDiseaseItem">
                <label>Severity</label>
                <input type="text" placeholder='High' />
            </div> 
            <button className="newDiseaseButton">Create</button>
        </form>
    </div>
  )
}

export default NewDisease