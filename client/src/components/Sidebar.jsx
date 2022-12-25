import React, { useState } from 'react';
import {
    FaTh,
    FaHospitalSymbol,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaDisease,
    FaSignOutAlt
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/doctors",
            name:"Doctors",
            icon:<FaUserAlt/>
        },
        {
            path:"/patients",
            name:"Patients",
            icon:<FaRegChartBar/>
        },
        {
            path:"/diseases",
            name:"Diseases",
            icon:<FaDisease/>
        },
        {
            path:"/logout",
            name:"Logout",
            icon:<FaSignOutAlt/>
        },
        // {
        //     path:"/product",
        //     name:"Product",
        //     icon:<FaShoppingBag/>
        // },
        // {
        //     path:"/productList",
        //     name:"Product List",
        //     icon:<FaThList/>
        // }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo"><FaHospitalSymbol/></h1>
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
};

export default Sidebar;