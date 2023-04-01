import React, { useState, useEffect } from 'react'
import "./prescription.css"
import { NavLink, useParams } from 'react-router-dom';
import { FaAccessibleIcon, FaDisease, FaTablets, FaUserMd } from 'react-icons/fa';

const Prescription = () => {
    const [singlePrescription, setSinglePrescription] = useState({frequency:'', duration:'', medicine_id:'', disease_id:'', patient_id:'', doctor_id:''});
    const [medicines, setMedicines] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const {id} = useParams();
    // console.log(id);

    useEffect(() => {
        fetch(`/prescriptions/${id}`)
        .then(res => res.json())
        .then(singlePrescription => setSinglePrescription(singlePrescription))
    }, [id]);

    useEffect(() => {
        fetch('/medicines')
        .then(res => res.json())
        .then(medicines => setMedicines(medicines))
    }, []);

    useEffect(() => {
        fetch('/diseases')
        .then(res => res.json())
        .then(diseases => setDiseases(diseases))
    }, []);

    useEffect(() => {
        fetch('/patients')
        .then(res => res.json())
        .then(patients => setPatients(patients))
    }, []);

    useEffect(() => {
        fetch('/doctors')
        .then(res => res.json())
        .then(doctors => setDoctors(doctors))
    }, []);

    const handleEdit = (e) => {
        setSinglePrescription({...singlePrescription, [e.target.name] : e.target.value})
    };

    function handleUpdate(e){        
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
                medicine_id: e.target.medicine_id.value,
                disease_id: e.target.disease_id.value,
                patient_id: e.target.patient_id.value,
                doctor_id: e.target.doctor_id.value,
            }),
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
    };

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
                        <span className="prescriptionShowprescriptionname">Frequency: {singlePrescription.frequency}</span>
                        <span className="prescriptionShowprescriptionTitle">Duration: {singlePrescription.duration}</span>
                    </div>
                </div>
                <div className="prescriptionShowBottom">
                    <span className="prescriptionShowTitle">Medicine</span>
                    <div className="prescriptionShowInfo">
                        <FaTablets className="prescriptionShowIcon" />
                        <span className="prescriptionShowInfoTitle">{singlePrescription.medicine_name}</span>
                    </div> 
                    <span className="prescriptionShowTitle">Disease</span>
                    <div className="prescriptionShowInfo">
                        <FaDisease className="prescriptionShowIcon" />
                        <span className="prescriptionShowInfoTitle">{singlePrescription.disease_name}</span>
                    </div> 
                    <span className="prescriptionShowTitle">Doctor</span> 
                    <div className="prescriptionShowInfo">
                        <FaUserMd className="prescriptionShowIcon" />
                        <span className="prescriptionShowInfoTitle">{singlePrescription.doctor_name}</span>
                    </div> 
                    <span className="prescriptionShowTitle">Patient</span>
                    <div className="prescriptionShowInfo">
                        <FaAccessibleIcon className="prescriptionShowIcon" />
                        <span className="prescriptionShowInfoTitle">{singlePrescription.patient_name}</span>
                    </div>                 
                </div>
            </div>
            <div className="prescriptionUpdate">
                <span className="prescriptionUpdateTitle">Edit</span>
                <form className="prescriptionUpdateForm" onSubmit={handleUpdate}>
                    <div className="prescriptionUpdateLeft">
                        <div className="prescriptionUpdateItem">
                            <label>Frequency</label>
                            <input type="text" name="frequency" className='prescriptionUpdateInput' value={singlePrescription.frequency} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="prescriptionUpdateItem">
                            <label>Duration</label>
                            <input type="text" name="duration" className='prescriptionUpdateInput' value={singlePrescription.duration} onChange={(e) => handleEdit(e)} />
                        </div>
                        <div className="prescriptionUpdateItem">
                            <label>Medicine</label>
                            <select name="medicine_id" value={singlePrescription.medicine_id} onChange={(e) => handleEdit(e)}>
                                {medicines.map(medicine => (
                                    <option key={medicine.id} value={medicine.id}>{medicine.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="prescriptionUpdateItem">
                            <label>Disease</label>
                            <select name="disease_id" value={singlePrescription.disease_id} onChange={(e) => handleEdit(e)}>
                                {diseases.map(disease => (
                                    <option key={disease.id} value={disease.id}>{disease.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="prescriptionUpdateItem">
                            <label>Patient</label>
                            <select name="patient_id" value={singlePrescription.patient_id} onChange={(e) => handleEdit(e)}>
                                {patients.map(patient => (
                                    <option key={patient.id} value={patient.id}>{patient.full_name}</option>
                                ))}
                            </select>
                        </div>  
                        <div className="prescriptionUpdateItem">
                            <label>Doctor</label>
                            <select name="doctor_id" value={singlePrescription.doctor_id} onChange={(e) => handleEdit(e)}>
                                {doctors.map(doctor => (
                                    <option key={doctor.id} value={doctor.id}>{doctor.full_name}</option>
                                ))}
                            </select>
                        </div>                      
                    </div>
                    <div className="prescriptionUpdateRight">
                        <button className="prescriptionUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Prescription