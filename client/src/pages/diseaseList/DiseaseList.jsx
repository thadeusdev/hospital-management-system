import React from 'react'
import "./diseaseList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'

const DiseaseList = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'symptoms', headerName: 'Symptoms', width: 200 },
    { field: 'severity', headerName: 'Severity', width: 200 },
    { 
      field: 'action',
      headerName: 'Action',
      width: 150 ,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/disease/"+params.row.id}>
              <button className="diseaseListEdit">Detail</button>
            </NavLink>                       
              <DeleteOutlineIcon className="diseaseListDelete" onClick={() => handleDelete(params.row.id)} />
          </>
        )
      }
    },
  ];

  const [diseases, setDiseases] = useState([])

    useEffect(() => {
        fetch('/diseases')
        .then(res => res.json())
        .then((diseases => setDiseases(diseases)))
    }, [])

    const handleDelete = (id) => {
      async function deleteDisease(){
        await fetch(`diseases/${id}`, {
          method: 'DELETE',
        })
        setDiseases(diseases.filter((disease) => disease.id !== id))
      }
      deleteDisease()
    }

  return (
    <div className='diseaseList'>
      <div className="diseaseTitleContainer">
      <h3 className="diseaseTitle">Diseases</h3>
        <NavLink to="/newDisease">
          <button className="diseaseAddButton">Create</button>
        </NavLink>            
      </div>

      <DataGrid
      rows={diseases}
      columns={columns}
      pageSize={8}
      rowsPerPageOptions={[8]}
      checkboxSelection
      disableSelectionOnClick
      />
    </div>
  )
}

export default DiseaseList