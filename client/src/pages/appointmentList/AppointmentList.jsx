import React from 'react'
import "./appointmentList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'

const AppointmentList = () => {
  const columns = [
    { field: 'notes', headerName: 'Notes', width: 140 },
    { field: 'date', headerName: 'Date', width: 140 },
    { field: 'time', headerName: 'Time', width: 140 },
    { field: 'doctor_name', headerName: 'Doctor', width: 140 },
    { field: 'patient_name', headerName: 'Patient', width: 140 },
    { 
      field: 'action',
      headerName: 'Action',
      width: 100 ,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/appointment/"+params.row.id}>
              <button className="appointmentListEdit">Detail</button>
            </NavLink>                       
              <DeleteOutlineIcon className="appointmentListDelete" onClick={() => handleDelete(params.row.id)} />
          </>
        )
      }
    },
  ];

  const [appointments, setAppointments] = useState([])

    useEffect((id) => {
        fetch('/doctor_appointments')
        .then(res => res.json())
        .then((appointments => setAppointments(appointments)))
    }, [])

    const handleDelete = (id) => {
      async function deleteAppointment(){
        await fetch(`/doctor_appointments/${id}`, {
          method: 'DELETE',
        })
        setAppointments(appointments.filter((appointment) => appointment.id !== id))
      }
      deleteAppointment()
    }

  return (
    <div className='appointmentList'>
      <div className="appointmentTitleContainer">
        <h3 className="appointmentTitle">Appointments</h3>
        <NavLink to="/newappointment">
          <button className="appointmentAddButton">Create</button>
        </NavLink>            
      </div>

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