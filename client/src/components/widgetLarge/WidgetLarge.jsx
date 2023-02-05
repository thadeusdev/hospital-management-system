import React from 'react'
import "./widgetLarge.css"
import { useEffect, useState } from 'react'

const WidgetLarge = () => {  
  const [patients, setPatients] = useState([])

    useEffect((id) => {
        fetch(`/doctors/${id}/patients`)
        .then(res => res.json())
        .then((patients => setPatients(patients)))
    }, [])

  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Recent Patients</h3>
      <table className="widgetLgTable">
        <thead>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Patient</th>
          <th className="widgetLgTh">Visit Date</th>
          <th className="widgetLgTh">Visit Number</th>
        </tr>
        </thead>
        <tbody>
        {patients.map((patient) => (
        <tr className="widgetLgTr" key={patient.id}>
          <td className="widgetLgUser">
            <img src={patient.image} alt="" className="widgetLgImg" />
            <span className="widgetLgName">{patient.full_name}</span>
          </td>
          <td className="widgetLgDate">{patient.visiting_date}</td>
          <td className="widgetLgAmount">{patient.visit_no}</td>
        </tr>
        ))}  
        </tbody>
              
      </table>
    </div>
  )
}

export default WidgetLarge