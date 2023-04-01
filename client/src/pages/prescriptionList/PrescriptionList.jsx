import React from 'react'
import "./prescriptionList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'

const PrescriptionList = () => {
  const columns = [
    { field: 'frequency', headerName: 'Frequency', width: 80},
    { field: 'duration', headerName: 'Duration', width: 80 },
    { field: 'medicine_name', headerName: 'Medicine', width: 120 },
    { field: 'disease_name', headerName: 'Disease', width: 120 },
    { field: 'patient_name', headerName: 'Patient', width: 150 },
    { field: 'doctor_name', headerName: 'Doctor', width: 150 },
    { 
      field: 'action',
      headerName: 'Action',
      width: 100 ,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/prescriptions/"+params.row.id}>
              <button className="prescriptionListEdit">Detail</button>
            </NavLink>                       
              <DeleteOutlineIcon className="prescriptionListDelete" onClick={() => handleDelete(params.row.id)} />
          </>
        )
      }
    },
  ];

  const [prescriptions, setprescriptions] = useState([])

    useEffect((id) => {
        fetch('/prescriptions')
        .then(res => res.json())
        .then((prescriptions => setprescriptions(prescriptions)))
    }, [])

    const handleDelete = (id) => {
      async function deleteprescription(){
        await fetch(`/prescriptions/${id}`, {
          method: 'DELETE',
        })
        setprescriptions(prescriptions.filter((prescription) => prescription.id !== id))
      }
      deleteprescription()
    }

  return (
    <div className='prescriptionList'>
      <div className="prescriptionTitleContainer">
      <h3 className="prescriptionTitle">prescriptions</h3>
        <NavLink to="/newPrescription">
          <button className="prescriptionAddButton">Create</button>
        </NavLink>            
      </div>

      <DataGrid
      rows={prescriptions}
      columns={columns}
      pageSize={8}
      rowsPerPageOptions={[8]}
      checkboxSelection
      disableSelectionOnClick
      />
    </div>
  )
}

export default PrescriptionList