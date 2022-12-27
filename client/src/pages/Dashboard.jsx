import React from 'react'
import DoctorsTable from './DoctorsTable'
import PatientsTable from './PatientsTable'
import DiseasesTable from './DiseasesTable'
import DoctorsAppointment from './DoctorsAppointment'
import DiagnosesTable from './DiagnosesTable'

import './Dashboard.css'

function Dashboard() {
  return (
    <div className="dash-container">
      <div className="dash-item">
        <DoctorsTable/>
      </div>
      <div className="dash-item">
        <PatientsTable/>
      </div>
      <div className="dash-item">
        <DiseasesTable />
      </div> 
      <div className="dash-item">
        <DoctorsAppointment />
      </div>  
      <div className="dash-item">
        <DiagnosesTable />
      </div>   
    </div>
  )
}

export default Dashboard