import React from 'react'
import "./appointmentList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'

const AppointmentList = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'notes', headerName: 'Notes', width: 200 },
    { field: 'patient_id', headerName: 'Patient Id', width: 120 },
    { field: 'doctor_id', headerName: 'Doctor Id', width: 120 },
    { 
      field: 'action',
      headerName: 'Action',
      width: 150 ,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/appointment/"+params.row.id}>
              <button className="appointmentListEdit">Detail</button>
            </NavLink>                       
              <DeleteOutlineIcon className="appointmentListDelete" />
          </>
        )
      }
    },
  ];

  const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch('/doctor_appointments')
        .then(res => res.json())
        .then((appointments => setAppointments(appointments)))
    }, [])

  return (
    <div className='appointmentList'>
      <h3 className="appointmentTitle">Appointments</h3>
      <DataGrid
      rows={appointments}
      columns={columns}
      pageSize={8}
      rowsPerPageOptions={[8]}
      checkboxSelection
      disableSelectionOnClick
      />
    </div>
  )
}

export default AppointmentList