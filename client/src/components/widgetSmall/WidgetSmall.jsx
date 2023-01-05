import React from 'react'
import "./widgetSmall.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react'

const WidgetSmall = ({id}) => {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        fetch('/doctors')
        .then(res => res.json())
        .then((doctors => setDoctors(doctors)))
    }, [])
  return (
    <div className='widgetSm'>
        <span className="widgetSmTitle">Available Doctors</span>
        <ul className="widgetSmList">
            {doctors.map((doctor) => (
                <>
                <li className="widgetSmListItem">
                    <img src={doctor.img} alt="" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">{doctor.full_name}</span>
                        <span className="widgetSmUserTitle">{doctor.primary_practice}</span>
                    </div>
                    <button className="widgetSmButton">
                        <VisibilityIcon className='widgetSmIcon' />
                        Display
                    </button>
                </li>
                </>
            ))}            
        </ul>
    </div>
  )
}

export default WidgetSmall