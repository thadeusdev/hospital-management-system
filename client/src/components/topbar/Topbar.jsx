import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import "./topbar.css"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Link } from 'react-router-dom';

const Topbar = () => {
    const [notifyItems, setNotifyItems] = useState(0)

    useEffect((id) => {
        fetch(`/doctor_appointments`)
        .then(r => r.json())
        .then(notifyItems => setNotifyItems(notifyItems))
    }, [])

    useEffect(() => {
        if (notifyItems > 0) {
            toast.success(`${notifyItems} appointments addesuccessfully`, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }, [notifyItems])
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topLeft">
            <Link to="/" className="logoLink">
                <span className="logo">                    
                    <img src={require("../../img/HealthCareLogo.png")} alt="" />
                </span>
            </Link>
            </div>
            <div className="topRight">
                <Link to="/appointment">
                <div className="topbarIconContainer">
                    <NotificationsNoneIcon className='icon'/>
                    <span className="topIconBadge">{notifyItems.length}</span>
                </div>
                </Link>
                <img src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000" alt="" className="topAvator" />
            </div>
        </div>
    </div>
  )
}

export default Topbar