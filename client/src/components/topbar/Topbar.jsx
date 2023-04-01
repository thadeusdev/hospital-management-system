import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import "./topbar.css"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Link, useParams } from 'react-router-dom';

const Topbar = () => {
    const [notifyItems, setNotifyItems] = useState(0)
    const [loggedInUser, setLoggedInUser] = useState({username: '', role: '', image: '', password: ''});
    const {id} = useParams();
    // console.log(id)

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
    }, [notifyItems]);
  
    useEffect(() => {
      fetch(`/users/${id}`)
      .then(res => res.json())
      .then(loggedInUser => setLoggedInUser(loggedInUser))
    }, [id]);
  
    if (!loggedInUser){
      return null;
    }
    
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
                <Link to={`/users/${loggedInUser.id}`}>
                <img src={loggedInUser.image} alt="" className="topAvator" />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Topbar