import React from 'react'
import "./diagnoseList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'

const DiagnoseList = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'performed_at', headerName: 'Performed At', width: 200 },
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

    useEffect((id) => {
        fetch('/diagnostics')
        .then(res => res.json())
        .then((diagnoses => setDiagnoses(diagnoses)))
    }, [])

    const handleDelete = (id) => {
      async function deleteDiagnose(){
        await fetch(`/diagnostics/${id}`, {
          method: 'DELETE',
        })
        setDiagnoses(diagnoses.filter((diagnose) => diagnose.id !== id))
      }
      deleteDiagnose()
    }

  return (
    <div className='diagnoseList'>
      <div className="diagnoseTitleContainer">
      <h3 className="diagnoseTitle">Diagnoses</h3>
        <NavLink to="/newDiagnose">
          <button className="diagnoseAddButton">Create</button>
        </NavLink>            
      </div> 

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