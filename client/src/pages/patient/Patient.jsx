import React from 'react'
import "./patient.css"
import PlaceIcon from '@mui/icons-material/Place';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { Link } from 'react-router-dom';

const Patient = () => {
  return (
    <div className='patient'>
        <div className="patientTitleContainer">
            <h1 className="patientTitle">Edit patient</h1>
            <Link to="/newPatient">
                <button className="patientAddButton">Create</button>
            </Link>            
        </div>
        <div className="patientContainer">
            <div className="patientShow">
                <div className="patientShowTop">
                    <div className="patientShowTopTitle">
                        <span className="patientShowPatientname">John Kilonzo</span>
                        <span className="patientShowPatientTitle">GN-114730-21</span>
                    </div>
                </div>
                <div className="patientShowBottom">
                    <span className="patientShowTitle">Address</span>
                    <div className="patientShowInfo">
                        <PlaceIcon className="patientShowIcon" />
                        <span className="patientShowInfoTitle">Lavington 2nd Ave</span>
                    </div> 
                    <span className="patientShowTitle">Disease</span> 
                    <div className="patientShowInfo">
                        <CoronavirusIcon className="patientShowIcon" />
                        <span className="patientShowInfoTitle">malaria</span>
                    </div>                  
                </div>
            </div>
            <div className="patientUpdate">
                <span className="patientUpdateTitle">Edit</span>
                <form className="patientUpdateForm">
                    <div className="patientUpdateLeft">
                        <div className="patientUpdateItem">
                            <label>Full Name</label>
                            <input type="text" placeholder='John Kilonzo' className='patientUpdateInput' />
                        </div>
                        <div className="patientUpdateItem">
                            <label>Address</label>
                            <input type="text" placeholder='Lavington 2nd Ave' className='patientUpdateInput' />
                        </div>
                        <div className="patientUpdateItem">
                            <label>Visit Date</label>
                            <input type="datetime-local" placeholder='2009-09-01T17:00:00.000Z' className='patientUpdateInput' />
                        </div>  
                        <div className="patientUpdateItem">
                            <label>Visit Number</label>
                            <input type="text" placeholder='GN-114730-21' className='patientUpdateInput' />
                        </div>                       
                    </div>
                    <div className="patientUpdateRight">
                        <button className="patientUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Patient