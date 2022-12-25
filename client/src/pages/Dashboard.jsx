import React from 'react'
import DoctorsTable from './DoctorsTable'
import PatientsTable from './PatientsTable'
import DiseasesTable from './DiseasesTable'

function Dashboard() {
  return (
    <div>
        <DoctorsTable/>
        <PatientsTable/>
        <DiseasesTable />
    </div>
  )
}

export default Dashboard