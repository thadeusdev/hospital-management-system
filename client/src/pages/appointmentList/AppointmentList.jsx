import React from 'react'
import "./appointmentList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'

const AppointmentList = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'notes', headerName: 'Notes', width: 200 },
    { 
      field: 'action',
      headerName: 'Action',
      width: 150 ,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/appointment/"+params.row.id}>
              <button className="appointmentListEdit">Edit</button>
            </Link>                       
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