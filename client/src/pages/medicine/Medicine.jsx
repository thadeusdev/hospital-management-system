import React, {  useState, useEffect } from 'react'
import "./medicine.css"
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import PublishIcon from '@mui/icons-material/Publish';
import VerifiedIcon from '@mui/icons-material/Verified';
import { NavLink, useParams } from 'react-router-dom';

const Medicine = () => {
    const [singleMedicine, setSingleMedicine] = useState({image: '', name: '', dosage: '', patient_id: '', description: '', category: '', is_acidic: '', infant_safe: ''})
    const [patients, setPatients] = useState([]);
    const {id} = useParams();
    // console.log(id)

    useEffect(() => {
        fetch('/patients')
        .then(res => res.json())
        .then(patients => setPatients(patients))
    }, [])

    useEffect(() => {
        fetch(`/medicines/${id}`)
        .then(res => res.json())
        .then(singleMedicine => setSingleMedicine(singleMedicine))
    }, [id])

    const handleEdit = (e) => {
        setSingleMedicine({...singleMedicine, [e.target.name] : e.target.value})
    }

    function handleUpdate(e){        
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
                infant_safe: e.target.infant_safe.value,
            }),
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
    }

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
                    <img src={singleMedicine.image} alt="" className="medicineShowImg" />
                    <div className="medicineShowTopTitle">
                        <span className="medicineShowMedicinename">{singleMedicine.name}</span>
                        <span className="medicineShowMedicineTitle">{singleMedicine.dosage}</span>
                    </div>
                </div>
                <div className="medicineShowBottom">
                    <span className="medicineShowTitle">Description</span>
                    <div className="medicineShowInfo">
                        <CoronavirusIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">{singleMedicine.description}</span>
                    </div> 
                    <span className="medicineShowTitle">Category</span> 
                    <div className="medicineShowInfo">
                        <VerifiedIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">{singleMedicine.category}</span>
                    </div> 
                    <span className="medicineShowTitle">Is acidic</span> 
                    <div className="medicineShowInfo">
                        <VerifiedIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">{singleMedicine.is_acidic.toString()}</span>
                    </div> 
                    <span className="medicineShowTitle">Infant safe</span> 
                    <div className="medicineShowInfo">
                        <VerifiedIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">{singleMedicine.infant_safe.toString()}</span>
                    </div> 
                    <span className="medicineShowTitle">Patient</span> 
                    <div className="medicineShowInfo">
                        <VerifiedIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">{singleMedicine.patient_name}</span>
                    </div>           
                </div>
            </div>
            <div className="medicineUpdate">
                <span className="medicineUpdateTitle">Edit</span>
                <form className="medicineUpdateForm" onSubmit={handleUpdate}>
                    <div className="medicineUpdateLeft">
                        <div className="medicineUpdateItem">
                            <label>Name</label>
                            <input type="text" name="name" placeholder='Asprine' className='medicineUpdateInput' value={singleMedicine.name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="medicineUpdateItem">
                            <label>Dosage</label>
                            <input type="text" name="dosage" placeholder='for headache' className='medicineUpdateInput' value={singleMedicine.dosage} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="medicineUpdateItem">
                            <label>Patient</label>
                            <select name="patient_id" value={singleMedicine.patient_id} onChange={(e) => handleEdit(e)}>
                                {patients.map(patient => (
                                    <option key={patient.id} value={patient.id}>{patient.full_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="medicineUpdateItem">
                            <label>Description</label>
                            <input type="text" name="description" placeholder='for headache' className='medicineUpdateInput' value={singleMedicine.description} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="medicineUpdateItem">
                            <label>Category</label>
                            <input type="text" name="category" placeholder='Tablet' className='medicineUpdateInput' value={singleMedicine.category} onChange={(e) => handleEdit(e)} />
                        </div> 
                        <div className="medicineUpdateItem">
                            <label>Acidic?</label>
                            <select name="is_acidic" id="acidic" className="newMedicineSelect">
                                <option name="is_acidic" value={singleMedicine.is_acidic} onChange={(e) => handleEdit(e)}>True</option>
                                <option name="is_acidic" value={singleMedicine.is_acidic} onChange={(e) => handleEdit(e)}>False</option>
                            </select>
                        </div> 
                        <div className="medicineUpdateItem">
                           <label>Infant safe?</label>
                            <select name="infant_safe" id="infant_safe" className="newMedicineSelect">
                                <option name="infant_safe" value={singleMedicine.infant_safe.toString()} onChange={(e) => handleEdit(e)}>True</option>
                                <option name="infant_safe" value={singleMedicine.infant_safe.toString()} onChange={(e) => handleEdit(e)}>False</option>
                            </select>
                        </div>                                                 
                    </div>
                    <div className="medicineUpdateRight">
                        <div className="medicineUpdateUpload">
                            <img src={singleMedicine.image} className="medicineUpdateImg" alt="" />
                            <label htmlFor="file"><PublishIcon className='medicineUpdateIcon' /></label>
                            <input type="file" id='file' style={{display: "none"}}  name="image" src={singleMedicine.image} onChange={(e) => handleEdit(e)} />
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