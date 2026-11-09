import React from 'react'
import "./patientList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'

const PatientList = () => {
  const columns = [
    { field: 'full_name', headerName: 'Full Name', width: 180, renderCell: (params) => {
      return (
          <div className='patientListName'>
              <img className='patientListImg' src={params.row.image} alt="" />
              {params.row.full_name}
          </div>
      )
  } },
    { field: 'age', headerName: 'Age', width: 80 },
    { field: 'gender', headerName: 'Gender', width: 80 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'visiting_date', headerName: 'Visit Date', width: 150 },
    { field: 'visit_no', headerName: 'Visit Number', width: 150 },
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
              <DeleteOutlineIcon className="patientListDelete" onClick={() => handleDelete(params.row.id)} />
          </>
        )
      }
    },
  ];

  const [patients, setPatients] = useState([])

    useEffect((id) => {
        fetch('/patients')
        .then(res => res.json())
        .then((patients => setPatients(patients)))
    }, [])

    const handleDelete = (id) => {
      async function deletePatient(){
        await fetch(`/patients/${id}`, {
          method: 'DELETE',
        })
        setPatients(patients.filter((patient) => patient.id !== id))
      }
      deletePatient()
    }

  return (
    <div className='patientList'>
      <div className="patientTitleContainer">
      <h3 className="patientTitle">Patients</h3>
        <NavLink to="/newPatient">
          <button className="patientAddButton">Create</button>
        </NavLink>            
      </div>

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

export default PatientList