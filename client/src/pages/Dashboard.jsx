import React from 'react'
import DoctorsTable from './DoctorsTable'
import PatientsTable from './PatientsTable'
import DiseasesTable from './DiseasesTable'

import './Dashboard.css'

function Dashboard() {
  return (
    <div>
      <div className="flex-container">
        <DoctorsTable/>
      </div>
      <div className="flex-container">
        <PatientsTable/>
      </div>
      <div className="flex-container">
        <DiseasesTable />
      </div>  
    </div>
  )
}

export default Dashboard