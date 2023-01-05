import React, { useState, useEffect } from 'react'
import "./doctor.css"
import BadgeIcon from '@mui/icons-material/Badge';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PublishIcon from '@mui/icons-material/Publish';
import { FaCalendarPlus }from "react-icons/fa";
import { NavLink } from 'react-router-dom';

import { useNavigate, useParams } from 'react-router-dom';

const Doctor = () => {
    const [doctoredit, setDoctoredit] = useState({img:'', full_name:'', primary_practice:'', secondary_practice:''})
    const history = useNavigate()
    const {id} = useParams();    

    // console.log(id)

    useEffect(() => {
        const editDoctorId = async() => {
            const reqdata= await fetch(`/doctors/${id}`);
            const res= reqdata.json();
            setDoctoredit(await res);
        }
        editDoctorId()
    },[])

    const handleEdit = (e) => {
        setDoctoredit({...doctoredit, [e.target.name] : e.target.value})
    }

    function handleDoctorupdate(e){        
        e.preventDefault();
        fetch(`/doctors/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                img: e.target.img.value,
                full_name: e.target.full_name.value,
                primary_practice: e.target.primary_practice.value,
                secondary_practice: e.target.secondary_practice.value
            }),
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
    }

  return (
    <div className='doctor'>
        <div className="doctorTitleContainer">
            <h1 className="doctorTitle">Edit doctor</h1>
            <NavLink to="/newDoctor">
                <button className="doctorAddButton">Create</button>
            </NavLink>            
        </div>
        <div className="doctorContainer">
            <div className="doctorShow">
                <div className="doctorShowTop">
                    <img src={doctoredit.img} alt="" className="doctorShowImg" />
                    <div className="doctorShowTopTitle">
                        <span className="doctorShowDoctorname">{doctoredit.full_name}</span>
                        <span className="doctorShowDoctorTitle">{doctoredit.primary_practice}</span>
                    </div>
                </div>
                <div className="doctorShowBottom">
                    <span className="doctorShowTitle">Primary & Secondary Practice</span>
                    <div className="doctorShowInfo">
                        <BadgeIcon className="doctorShowIcon" />
                        <span className="doctorShowInfoTitle">{doctoredit.primary_practice}</span>
                    </div>  
                    <div className="doctorShowInfo">
                        <BadgeIcon className="doctorShowIcon" />
                        <span className="doctorShowInfoTitle">{doctoredit.secondary_practice}</span>
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
                <form onSubmit={ handleDoctorupdate } className="doctorUpdateForm">
                    <div className="doctorUpdateLeft">
                        <div className="doctorUpdateItem">
                            <label>Full Name</label>
                            <input type="text" name="full_name" placeholder='Anna Becker' className='doctorUpdateInput' value={doctoredit.full_name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="doctorUpdateItem">
                            <label>Primary Practice</label>
                            <input type="text" name="primary_practice" placeholder='Family Practice Physician' className='doctorUpdateInput' value={doctoredit.primary_practice} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="doctorUpdateItem">
                            <label>Secondary Practice</label>
                            <input type="text" name="secondary_practice" placeholder='Internal medical doctor' className='doctorUpdateInput' value={doctoredit.secondary_practice} onChange={(e) => handleEdit(e)} />
                        </div>                        
                    </div>
                    <div className="doctorUpdateRight">
                        <div className="doctorUpdateUpload">
                            <img className="doctorUpdateImg" src={doctoredit.img} alt="" />
                            <label htmlFor="file"><PublishIcon className='doctorUpdateIcon' /></label>
                            <input type="file" id='file' style={{display: "none"}}  name="img" src={doctoredit.img} onChange={(e) => handleEdit(e)} />
                        </div>
                        <button className="doctorUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Doctor