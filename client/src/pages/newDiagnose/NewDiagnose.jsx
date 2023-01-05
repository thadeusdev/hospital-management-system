import React from 'react'
import "./newDiagnose.css"

const NewDiagnose = () => {
  return (
    <div className='newDiagnose'>
        <h1 className="newDiagnoseTitle">New Diagnose</h1>
        <form className="newDiagnoseForm">
            <div className="newDiagnoseItem">
                <label>Notes</label>
                <input type="text" placeholder='Chronic condition' />
            </div>
            <div className="newDiagnoseItem">
                <label>Pulse</label>
                <input type="text" placeholder='100' />
            </div>
            <div className="newDiagnoseItem">
                <label>Sugar</label>
                <input type="text" placeholder='140' />
            </div>
            <div className="newDiagnoseItem">
                <label>Temperature</label>
                <input type="text" placeholder='37' />
            </div>
            <div className="newDiagnoseItem">
                <label>Pressure</label>
                <input type="text" placeholder='80' />
            </div>
            <button className="newDiagnoseButton">Create</button>
        </form>
    </div>
  )
}

export default NewDiagnose