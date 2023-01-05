import React, {  useState, useEffect, Component } from 'react'
import "./medicine.css"
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import PublishIcon from '@mui/icons-material/Publish';
import VerifiedIcon from '@mui/icons-material/Verified';
import { NavLink } from 'react-router-dom';

import { useNavigate, useParams } from 'react-router-dom';

const Medicine = () => {
    const [medicineedit, setMedicineedit] = useState({img:'', name:'', description:'', category:'', is_acidic:'', infant_safe:'', patient_id:'', disease_id:''})
    const history = useNavigate()
    const {id} = useParams(); 

    // console.log(id)

    useEffect(() => {
        const editMedicineId = async() => {
            const reqdata= await fetch(`/medicines/${id}`);
            const res= reqdata.json();
            setMedicineedit(await res);
        }
        editMedicineId()
    },[])

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
                img: e.target.img.value,
                name: e.target.name.value,
                description: e.target.description.value,
                category: e.target.category.value,
                // is_acidic: e.target.is_acidic.value,
                // infant_safe: e.target.infant_safe.value,
                patient_id: e.target.patient_id.value,
                disease_id: e.target.disease_id.value,
            }),
        },[])
        .then((r) => r.json())
        .then((data) => console.log(data))
    }
    
    const fileSelectedHandler=(e)=>{
        console.log(e.target.files[0])
        this.setState({state: e.target.files[0]})
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
                    <img src={medicineedit.img} alt="" className="medicineShowImg" />
                    <div className="medicineShowTopTitle">
                        <span className="medicineShowMedicinename">{medicineedit.name}</span>
                        <span className="medicineShowMedicineTitle">{medicineedit.patient_id}</span>
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
                        <span className="medicineShowInfoTitle">{medicineedit.is_acidic}</span>
                    </div> 
                    <span className="medicineShowTitle">Infant safe</span> 
                    <div className="medicineShowInfo">
                        <span className="medicineShowInfoTitle">{medicineedit.infant_safe}</span>
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
                            <label>Description</label>
                            <input type="text" name="description" placeholder='for headache' className='medicineUpdateInput' value={medicineedit.description} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="medicineUpdateItem">
                            <label>Category</label>
                            <input type="text" name="category" placeholder='Tablet' className='medicineUpdateInput' value={medicineedit.category} onChange={(e) => handleEdit(e)} />
                        </div> 
                        <div className="medicineUpdateItem">
                            <label>Acidic?</label>
                            <select name="acidic" id="acidic" className="newMedicineSelect">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div> 
                        <div className="medicineUpdateItem">
                           <label>Acidic?</label>
                            <select name="acidic" id="acidic" className="newMedicineSelect">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div> 
                        <div className="medicineUpdateItem">
                            <label>Patient Name</label>
                            <input type="text" name="patient_id" placeholder='John Kilonzo' className='medicineUpdateInput' value={medicineedit.patient_id} onChange={(e) => handleEdit(e)} />
                        </div> 
                        <div className="medicineUpdateItem">
                            <label>Disease</label>
                            <input type="text" name="disease_id" placeholder='malaria' className='medicineUpdateInput' value={medicineedit.disease_id} onChange={(e) => handleEdit(e)} />
                        </div>                                                 
                    </div>
                    <div className="medicineUpdateRight">
                        <div className="medicineUpdateUpload">
                            <img className="medicineUpdateImg" src={medicineedit.img} alt="" />
                            <label htmlFor="file"><PublishIcon className='medicineUpdateIcon' /></label>
                            <input type="file" id='file' style={{display: "none"}}  name="img" src={medicineedit.img} onChange={(e)=>fileSelectedHandler(e)} />
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