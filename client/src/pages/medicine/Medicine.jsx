import React, {  useState, useEffect } from 'react'
import "./medicine.css"
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import PublishIcon from '@mui/icons-material/Publish';
import VerifiedIcon from '@mui/icons-material/Verified';
import { NavLink } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const Medicine = () => {
    const [medicineedit, setMedicineedit] = useState({image:'', name:'', dosage:'', patient_id:'', description:'', category:'', is_acidic:'', infant_safe:''})
    const {id} = useParams(); 

    // console.log(id)

    useEffect(() => {
        const editMedicineId = async() => {
            const reqdata= await fetch(`/medicines/${id}`);
            const res= reqdata.json();
            setMedicineedit(await res);
        }
        editMedicineId()
    },[id])

    const handleEdit = (e) => {
        setMedicineedit({...medicineedit, [e.target.name] : e.target.value})
    }

    function handleMedicineupdate(e){    

        e.preventDefault();
        fetch(`/medicines/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                image: e.target.image.value,
                name: e.target.name.value,
                dosage: e.target.dosage.value,
                patient_id: e.target.patient_id.value,
                description: e.target.description.value,
                category: e.target.category.value,
                is_acidic: e.target.is_acidic.value,
                infant_safe: e.target.infant_safe.value
            }),
        },[])
        .then((r) => r.json())
        .then((data) => console.log(data))
    }

    const [patientedit, setPatientedit] = useState([])
    useEffect(() => {
        const editPatientId = async() => {
            const reqdata= await fetch(`/medicines/${id}/patients/${id}`);
            const res= reqdata.json();
            setPatientedit(await res);
        }
        editPatientId()
    },[id])

  return (
    <div className='medicine'>
        <div className="medicineTitleContainer">
            <h1 className="medicineTitle">Edit medicine</h1>
            <NavLink to="/newMedicine">
                <button className="medicineAddButton">Create</button>
            </NavLink>            
        </div>
        <div className="medicineContainer">
            <div className="medicineShow">
                <div className="medicineShowTop">
                    <img src={medicineedit.image} alt="" className="medicineShowImg" />
                    <div className="medicineShowTopTitle">
                        <span className="medicineShowMedicinename">{medicineedit.name}</span>
                        <span className="medicineShowMedicineTitle">{medicineedit.dosage}</span>
                    </div>
                </div>
                <div className="medicineShowBottom">
                    <span className="medicineShowTitle">Description</span>
                    <div className="medicineShowInfo">
                        <CoronavirusIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">{medicineedit.description}</span>
                    </div> 
                    <span className="medicineShowTitle">Category</span> 
                    <div className="medicineShowInfo">
                        <VerifiedIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">{medicineedit.category}</span>
                    </div> 
                    <span className="medicineShowTitle">Is acidic</span> 
                    <div className="medicineShowInfo">
                        <VerifiedIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">{medicineedit.is_acidic.toString()}</span>
                    </div> 
                    <span className="medicineShowTitle">Infant safe</span> 
                    <div className="medicineShowInfo">
                        <VerifiedIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">{medicineedit.infant_safe.toString()}</span>
                    </div> 
                    <span className="medicineShowTitle">Patient</span> 
                    <div className="medicineShowInfo">
                        <VerifiedIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">{patientedit.full_name}</span>
                    </div>           
                </div>
            </div>
            <div className="medicineUpdate">
                <span className="medicineUpdateTitle">Edit</span>
                <form onSubmit={ handleMedicineupdate } className="medicineUpdateForm">
                    <div className="medicineUpdateLeft">
                        <div className="medicineUpdateItem">
                            <label>Name</label>
                            <input type="text" name="name" placeholder='Asprine' className='medicineUpdateInput' value={medicineedit.name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="medicineUpdateItem">
                            <label>Dosage</label>
                            <input type="text" name="dosage" placeholder='for headache' className='medicineUpdateInput' value={medicineedit.dosage} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="medicineUpdateItem">
                            <label>Patient</label>
                            <input type="text" name="patient_id" placeholder='for headache' className='medicineUpdateInput' value={patientedit.full_name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="medicineUpdateItem">
                            <label>Description</label>
                            <input type="text" name="description" placeholder='for headache' className='medicineUpdateInput' value={medicineedit.description} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="medicineUpdateItem">
                            <label>Category</label>
                            <input type="text" name="category" placeholder='Tablet' className='medicineUpdateInput' value={medicineedit.category} onChange={(e) => handleEdit(e)} />
                        </div> 
                        <div className="medicineUpdateItem">
                            <label>Acidic?</label>
                            <select name="is_acidic" id="acidic" className="newMedicineSelect">
                                <option name="is_acidic" value={medicineedit.is_acidic} onChange={(e) => handleEdit(e)}>True</option>
                                <option name="is_acidic" value={medicineedit.is_acidic} onChange={(e) => handleEdit(e)}>False</option>
                            </select>
                        </div> 
                        <div className="medicineUpdateItem">
                           <label>Infant safe?</label>
                            <select name="infant_safe" id="infant_safe" className="newMedicineSelect">
                                <option name="infant_safe" value={medicineedit.infant_safe} onChange={(e) => handleEdit(e)}>True</option>
                                <option name="infant_safe" value={medicineedit.infant_safe} onChange={(e) => handleEdit(e)}>False</option>
                            </select>
                        </div>                                                 
                    </div>
                    <div className="medicineUpdateRight">
                        <div className="medicineUpdateUpload">
                            <img className="medicineUpdateImg" src={medicineedit.image} alt="" />
                            <label htmlFor="file"><PublishIcon className='medicineUpdateIcon' /></label>
                            <input type="file" id='file' style={{display: "none"}}  name="image" src={medicineedit.image} onChange={(e) => handleEdit(e)} />
                        </div>
                        <button className="medicineUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Medicine