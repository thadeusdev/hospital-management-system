import React from 'react'
import "./widgetLarge.css"
import { useEffect, useState } from 'react'

const WidgetLarge = () => {  
  const [patients, setPatients] = useState([])

    useEffect(() => {
        fetch('/patients')
        .then(res => res.json())
        .then((patients => setPatients(patients)))
    }, [])

  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Recent Patients</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Patient</th>
          <th className="widgetLgTh">Visit Date</th>
          <th className="widgetLgTh">Visit Number</th>
        </tr>
        {patients.map((patient) => (
          <>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={patient.img} alt="" className="widgetLgImg" />
              <span className="widgetLgName">{patient.full_name}</span>
            </td>
            <td className="widgetLgDate">{patient.visiting_date}</td>
            <td className="widgetLgAmount">{patient.visit_no}</td>
          </tr>
          </>
        ))}                
      </table>
    </div>
  )
}

export default WidgetLarge