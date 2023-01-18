import React, { useState, useEffect } from 'react';
import Login from '../../pages/Registration/Login/Login';
import Signup from '../../pages/Registration/Signup/Signup';
import "./sidebar.css"
import {
    FaTh,
    FaBars,
    FaCalendarAlt,
    FaUserMd,
    FaWheelchair,
    FaDisease,
    FaMicroscope,
    FaTablets,
    FaPrescriptionBottleAlt,
    FaSignOutAlt,
}from "react-icons/fa";
import { Route, Routes, NavLink } from 'react-router-dom';

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/appointment",
            name:"Appointment",
            icon:<FaCalendarAlt/>
        },
        {
            path:"/doctors",
            name:"Doctors",
            icon:<FaUserMd/>
        },
        {
            path:"/patients",
            name:"Patients",
            icon:<FaWheelchair/>
        },
        {
            path:"/diseases",
            name:"Diseases",
            icon:<FaDisease/>
        },
        {
            path:"/diagnoses",
            name:"Diagnoses",
            icon:<FaMicroscope/>
        },
        {
            path:"/medicines",
            name:"Medicines",
            icon:<FaTablets/>
        },
        {
            path:"/prescriptions",
            name:"Prescriptions",
            icon:<FaPrescriptionBottleAlt/>
        },
        {
            path:"/Login",
            name:"Logout",
            icon:<FaSignOutAlt onClick={handleLogout}/>
        }
    ]

    const [user, setUser] = useState(null);

    useEffect(() => {
      fetch("/me").then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        }
      });
    }, []);

    if (user) {
        return (
            <div className="container">
               <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
                   <div className="top_section">
                       <h1 style={{display: isOpen ? "block" : "none"}} id="logo1">{user.username}</h1>
                       <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                           <FaBars onClick={toggle}/>
                       </div>
                   </div>
                   {
                       menuItem.map((item, index)=>(
                           <NavLink to={item.path} key={index} className="link" activeclassname="active">
                               <div className="icon">{item.icon}</div>
                               <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                           </NavLink>
                       ))
                   }              
               </div>              
               <main>{children}</main>
            </div>
        );
      } else {
        return (
            <Routes>
            <Route path='/' element={<Login onLogin={setUser} />}>
              </Route>
              <Route path='/Login' element={<Login onLogin={setUser} />}>
              </Route>
              <Route path='/Signup'element= {<Signup onLogin={setUser}/>}>
              </Route>
            </Routes>
        )
      }

      function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => setUser(null));
      }
    }

export default Sidebar;