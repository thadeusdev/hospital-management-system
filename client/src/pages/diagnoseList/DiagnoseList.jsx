import React from 'react'
import "./diagnoseList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'

const DiagnoseList = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'notes', headerName: 'Notes', width: 200 },
    { field: 'diagnosed_on', headerName: 'Diagnosed date', width: 200 },
    { field: 'pulse', headerName: 'Pulse', width: 70 },
    { field: 'sugar', headerName: 'Sugar', width: 70 },
    { field: 'temperature', headerName: 'Temperature', width: 120 },
    { field: 'pressure', headerName: 'Pressure', width: 100 },
    { 
      field: 'action',
      headerName: 'Action',
      width: 150 ,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/diagnose/"+params.row.id}>
              <button className="diagnoseListEdit">Detail</button>
            </NavLink>                       
              <DeleteOutlineIcon className="diagnoseListDelete" onClick={() => handleDelete(params.row.id)} />
          </>
        )
      }
    },
  ];

  const [diagnoses, setDiagnoses] = useState([])

    useEffect(() => {
        fetch('/diagnostics')
        .then(res => res.json())
        .then((diagnoses => setDiagnoses(diagnoses)))
    }, [])

    const handleDelete = (id) => {
      async function deleteDiagnose(){
        await fetch(`diagnostics/${id}`, {
          method: 'DELETE',
        })
        setDiagnoses(diagnoses.filter((diagnose) => diagnose.id !== id))
      }
      deleteDiagnose()
    }

  return (
    <div className='diagnoseList'>
      <h3 className="diagnoseTitle">Diagnoses</h3>
      <DataGrid
      rows={diagnoses}
      columns={columns}
      pageSize={8}
      rowsPerPageOptions={[8]}
      checkboxSelection
      disableSelectionOnClick
      />
    </div>
  )
}

export default DiagnoseList