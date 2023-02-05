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
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'time', headerName: 'Time', width: 200 },
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
              <DeleteOutlineIcon className="appointmentListDelete" onClick={() => handleDelete(params.row.id)} />
          </>
        )
      }
    },
  ];

  const [appointments, setAppointments] = useState([])

    useEffect((id) => {
        fetch(`/doctors/${id}/patients/${id}/doctor_appointments`)
        .then(res => res.json())
        .then((appointments => setAppointments(appointments)))
    }, [])

    const handleDelete = (id) => {
      async function deleteAppointment(){
        await fetch(`/doctors/${id}/patients/${id}/doctor_appointments/${id}`, {
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