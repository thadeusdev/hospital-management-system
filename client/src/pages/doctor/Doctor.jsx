import React from 'react'
import "./doctor.css"
import BadgeIcon from '@mui/icons-material/Badge';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { FaCalendarPlus }from "react-icons/fa";
import { Link } from 'react-router-dom';

const Doctor = () => {
    
  return (
    <div className='doctor'>
        <div className="doctorTitleContainer">
            <h1 className="doctorTitle">Edit doctor</h1>
            <Link to="/newDoctor">
                <button className="doctorAddButton">Create</button>
            </Link>            
        </div>
        <div className="doctorContainer">
            <div className="doctorShow">
                <div className="doctorShowTop">
                    <div className="doctorShowTopTitle">
                        <span className="doctorShowDoctorname">Joy Ndanu</span>
                        <span className="doctorShowDoctorTitle">Family Practice Physician</span>
                    </div>
                </div>
                <div className="doctorShowBottom">
                    <span className="doctorShowTitle">Primary & Secondary Practice</span>
                    <div className="doctorShowInfo">
                        <BadgeIcon className="doctorShowIcon" />
                        <span className="doctorShowInfoTitle">Family Practice Physician</span>
                    </div>  
                    <div className="doctorShowInfo">
                        <BadgeIcon className="doctorShowIcon" />
                        <span className="doctorShowInfoTitle">Nurse</span>
                    </div>
                    <span className="doctorShowTitle">Patients</span>
                    <div className="doctorShowInfo">
                        <AccessibleIcon className="doctorShowIcon" />
                        <span className="doctorShowInfoTitle">John Kilonzo</span>
                    </div>
                    <span className="doctorShowTitle">Appointments</span>
                    <div className="doctorShowInfo">
                        <FaCalendarPlus className="doctorShowIcon" />
                        <span className="doctorShowInfoTitle">Normal checkup</span>
                    </div>                  
                </div>
            </div>
            <div className="doctorUpdate">
                <span className="doctorUpdateTitle">Edit</span>
                <form className="doctorUpdateForm">
                    <div className="doctorUpdateLeft">
                        <div className="doctorUpdateItem">
                            <label>Full Name</label>
                            <input type="text" placeholder='Anna Becker' className='doctorUpdateInput' />
                        </div>
                        <div className="doctorUpdateItem">
                            <label>Primary Practice</label>
                            <input type="text" placeholder='Family Practice Physician' className='doctorUpdateInput' />
                        </div>
                        <div className="doctorUpdateItem">
                            <label>Secondary Practice</label>
                            <input type="text" placeholder='Internal medical doctor' className='doctorUpdateInput' />
                        </div>                        
                    </div>
                    <div className="doctorUpdateRight">
                        <button className="doctorUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Doctor