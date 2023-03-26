import React, { useState, useEffect } from 'react'
import "./prescription.css"
import { NavLink } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { FaAccessibleIcon, FaDisease, FaTablets, FaUserMd } from 'react-icons/fa';

const Prescription = () => {
    const [prescriptionedit, setPrescriptionedit] = useState({frequency:'', duration:'', medicine_id:'', disease_id:'', patient_id:'', doctor_id:''})
    const {id} = useParams();

    // console.log(id)

    useEffect((id) => {
        const editprescriptionId = async() => {
            const reqdata= await fetch(`/prescriptions/${id}`);
            const res= reqdata.json();
            setPrescriptionedit(await res);
        }
        editprescriptionId()
    },[id])

    const handleEdit = (e) => {
        setPrescriptionedit({...prescriptionedit, [e.target.name] : e.target.value})
    }

    function handlePrescriptionupdate(e){        
        e.preventDefault();
        fetch(`/prescriptions/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                frequency: e.target.frequency.value,
                duration: e.target.duration.value,
            }),
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
    }

    const [medicineedit, setMedicineedit] = useState([])
    useEffect((id) => {
        const editMedicineId = async() => {
            const reqdata= await fetch(`/doctors/${id}/patients/${id}/medicines/${id}`);
            const res= reqdata.json();
            setMedicineedit(await res);
        }
        editMedicineId()
    },[id])

    const [diseaseedit, setDiseaseedit] = useState([])
    useEffect((id) => {
        const editDiseaseId = async() => {
            const reqdata= await fetch(`/doctors/${id}/patients/${id}/diseases/${id}`);
            const res= reqdata.json();
            setDiseaseedit(await res);
        }
        editDiseaseId()
    },[id])

    const [patientedit, setPatientedit] = useState([])
    useEffect((id) => {
        const editPatientId = async() => {
            const reqdata= await fetch(`/doctors/${id}/patients/${id}`);
            const res= reqdata.json();
            setPatientedit(await res);
        }
        editPatientId()
    },[id])

    const [doctoredit, setDoctoredit] = useState([])
    useEffect((id) => {
        const editDoctorId = async() => {
            const reqdata= await fetch(`/doctors/${id}`);
            const res= reqdata.json();
            setDoctoredit(await res);
        }
        editDoctorId()
    },[id])

  return (
    <div className='prescription'>
        <div className="prescriptionTitleContainer">
            <h1 className="prescriptionTitle">Edit prescription</h1>
            <NavLink to="/newprescription">
                <button className="prescriptionAddButton">Create</button>
            </NavLink>            
        </div>
        <div className="prescriptionContainer">
            <div className="prescriptionShow">
                <div className="prescriptionShowTop">
                    <div className="prescriptionShowTopTitle">
                        <span className="prescriptionShowprescriptionname">{prescriptionedit.frequency}</span>
                        <span className="prescriptionShowprescriptionTitle">{prescriptionedit.duration}</span>
                    </div>
                </div>
                <div className="prescriptionShowBottom">
                    <span className="prescriptionShowTitle">Medicine</span>
                    <div className="prescriptionShowInfo">
                        <FaTablets className="prescriptionShowIcon" />
                        <span className="prescriptionShowInfoTitle">{medicineedit.name}</span>
                    </div> 
                    <span className="prescriptionShowTitle">Disease</span>
                    <div className="prescriptionShowInfo">
                        <FaDisease className="prescriptionShowIcon" />
                        <span className="prescriptionShowInfoTitle">{diseaseedit.name}</span>
                    </div> 
                    <span className="prescriptionShowTitle">Doctor</span> 
                    <div className="prescriptionShowInfo">
                        <FaUserMd className="prescriptionShowIcon" />
                        <span className="prescriptionShowInfoTitle">{doctoredit.full_name}</span>
                    </div> 
                    <span className="prescriptionShowTitle">Patient</span>
                    <div className="prescriptionShowInfo">
                        <FaAccessibleIcon className="prescriptionShowIcon" />
                        <span className="prescriptionShowInfoTitle">{patientedit.full_name}</span>
                    </div>                 
                </div>
            </div>
            <div className="prescriptionUpdate">
                <span className="prescriptionUpdateTitle">Edit</span>
                <form onSubmit={ handlePrescriptionupdate } className="prescriptionUpdateForm">
                    <div className="prescriptionUpdateLeft">
                        <div className="prescriptionUpdateItem">
                            <label>Frequency</label>
                            <input type="text" name="frequency" className='prescriptionUpdateInput' value={prescriptionedit.frequency} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="prescriptionUpdateItem">
                            <label>Duration</label>
                            <input type="text" name="duration" className='prescriptionUpdateInput' value={prescriptionedit.duration} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="prescriptionUpdateItem">
                            <label>Medicine</label>
                            <input type="text" name="medicine_id" className='prescriptionUpdateInput' value={medicineedit.name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="prescriptionUpdateItem">
                            <label>Disease</label>
                            <input type="text" name="disease_id" className='prescriptionUpdateInput' value={diseaseedit.name} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="prescriptionUpdateItem">
                            <label>Patient</label>
                            <input type="text" name="patient_id" className='prescriptionUpdateInput' value={patientedit.full_name} onChange={(e) => handleEdit(e)} />
                        </div>  
                        <div className="prescriptionUpdateItem">
                            <label>Doctor</label>
                            <input type="text" name="doctor_id" className='prescriptionUpdateInput' value={doctoredit.full_name} onChange={(e) => handleEdit(e)} />
                        </div>                       
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Prescription