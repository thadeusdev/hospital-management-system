import React from 'react'
import "./patientList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'

const DoctorList = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'full_name', headerName: 'Full Name', width: 200, renderCell: (params) => {
      return (
          <div className='patientListName'>
              <img className='patientListImg' src={params.row.img} alt="" />
              {params.row.full_name}
          </div>
      )
  } },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'visiting_date', headerName: 'Visit Date', width: 200 },
    { field: 'visit_no', headerName: 'Visit Number', width: 200 },
    { 
      field: 'action',
      headerName: 'Action',
      width: 150 ,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/patient/"+params.row.id}>
              <button className="patientListEdit">Detail</button>
            </NavLink>                       
              <DeleteOutlineIcon className="patientListDelete" />
          </>
        )
      }
    },
  ];

  const [patients, setPatients] = useState([])

    useEffect(() => {
        fetch('/patients')
        .then(res => res.json())
        .then((patients => setPatients(patients)))
    }, [])

  return (
    <div className='patientList'>
      <h3 className="patientTitle">Patients</h3>
      <DataGrid
      rows={patients}
      columns={columns}
      pageSize={8}
      rowsPerPageOptions={[8]}
      checkboxSelection
      disableSelectionOnClick
      />
    </div>
  )
}

export default DoctorList