import React from 'react'
import "./doctorList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'

const DoctorList = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'full_name', headerName: 'Full Name', width: 200 },
    { field: 'primary_practice', headerName: 'Primary Practice', width: 200 },
    { field: 'secondary_practice', headerName: 'Secondary Practice', width: 200 },
    { 
      field: 'action',
      headerName: 'Action',
      width: 150 ,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/doctor/"+params.row.id}>
              <button className="doctorListEdit">Edit</button>
            </Link>                       
              <DeleteOutlineIcon className="doctorListDelete" />
          </>
        )
      }
    },
  ];

  const [doctors, setDoctors] = useState([])

    useEffect(() => {
        fetch('/doctors')
        .then(res => res.json())
        .then((doctors => setDoctors(doctors)))
    }, [])

  return (
    <div className='doctorList'>
      <DataGrid
      rows={doctors}
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