import React from 'react'
import "./medicineList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'

const MedicineList = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Full Name', width: 200, renderCell: (params) => {
      return (
          <div className='medicineListName'>
              <img className='medicineListImg' src={params.row.img} alt="" />
              {params.row.name}
          </div>
      )
  } },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'category', headerName: 'Category', width: 120 },
    { field: 'is_acidic', headerName: 'Is Acidic', width: 90 },
    { field: 'infant_safe', headerName: 'Infant Safe', width: 90 },
    { 
      field: 'action',
      headerName: 'Action',
      width: 150 ,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/medicine/"+params.row.id}>
              <button className="medicineListEdit">Detail</button>
            </NavLink>                       
              <DeleteOutlineIcon className="medicineListDelete" onClick={() => handleDelete(params.row.id)} />
          </>
        )
      }
    },
  ];

  const [medicines, setMedicines] = useState([])

    useEffect(() => {
        fetch('/medicines')
        .then(res => res.json())
        .then((medicines => setMedicines(medicines)))
    }, [])

    const handleDelete = (id) => {
      async function deleteMedicine(){
        await fetch(`/medicines/${id}`, {
          method: 'DELETE',
        })
        setMedicines(medicines.filter((medicine) => medicine.id !== id))
      }
      deleteMedicine()
    }

  return (
    <div className='medicineList'>
      <div className="medicineTitleContainer">
      <h3 className="medicineTitle">Medicines</h3>
        <NavLink to="/newMedicine">
          <button className="medicineAddButton">Create</button>
        </NavLink>            
      </div>

      <DataGrid
      rows={medicines}
      columns={columns}
      pageSize={8}
      rowsPerPageOptions={[8]}
      checkboxSelection
      disableSelectionOnClick
      />
    </div>
  )
}

export default MedicineList