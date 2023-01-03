import React from 'react'
import "./widgetSmall.css"
import VisibilityIcon from '@mui/icons-material/Visibility';

const WidgetSmall = () => {
  return (
    <div className='widgetSm'>
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            <li className="widgetSmListItem">
                <img src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000" alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">Anna Keller</span>
                    <span className="widgetSmUserTitle">Nurse</span>
                </div>
                <button className="widgetSmButton">
                    <VisibilityIcon className='widgetSmIcon' />
                    Display
                </button>
            </li>
            <li className="widgetSmListItem">
                <img src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000" alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">Anna Keller</span>
                    <span className="widgetSmUserTitle">Nurse</span>
                </div>
                <button className="widgetSmButton">
                    <VisibilityIcon className='widgetSmIcon' />
                    Display
                </button>
            </li>
            <li className="widgetSmListItem">
                <img src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000" alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">Anna Keller</span>
                    <span className="widgetSmUserTitle">Nurse</span>
                </div>
                <button className="widgetSmButton">
                    <VisibilityIcon className='widgetSmIcon' />
                    Display
                </button>
            </li>
            <li className="widgetSmListItem">
                <img src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000" alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">Anna Keller</span>
                    <span className="widgetSmUserTitle">Nurse</span>
                </div>
                <button className="widgetSmButton">
                    <VisibilityIcon className='widgetSmIcon' />
                    Display
                </button>
            </li>
            <li className="widgetSmListItem">
                <img src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000" alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">Anna Keller</span>
                    <span className="widgetSmUserTitle">Nurse</span>
                </div>
                <button className="widgetSmButton">
                    <VisibilityIcon className='widgetSmIcon' />
                    Display
                </button>
            </li>
        </ul>
    </div>
  )
}

export default WidgetSmall