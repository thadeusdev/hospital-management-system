import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import AppointmentList from './pages/appointmentList/AppointmentList';
import Dashboard from './pages/dashboard/Dashboard';
import DiagnoseList from './pages/diagnoseList/DiagnoseList';
import Disease from './pages/disease/Disease';
import DiseaseList from './pages/diseaseList/DiseaseList';
import Doctor from './pages/doctor/Doctor';
import DoctorList from './pages/doctorList/DoctorList';
import Medicine from './pages/medicine/Medicine';
import MedicineList from './pages/medicineList/MedicineList';
import NewDisease from './pages/newDisease/NewDisease';
import NewDoctor from './pages/newDoctor/NewDoctor';
import NewMedicine from './pages/newMedicine/NewMedicine';
import NewPatient from './pages/newPatient/NewPatient';
import Patient from './pages/patient/Patient';
import PatientList from './pages/patientList/PatientList';

const App = () => {
  return (
    <BrowserRouter>
    <Topbar/>
      <Sidebar>      
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointment" element={<AppointmentList />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/diseases" element={<DiseaseList />} />
          <Route path="/diagnoses" element={<DiagnoseList />} />
          <Route path="/medicines" element={<MedicineList />} />
          <Route path="/doctor/:doctorId" element={<Doctor />} />
          <Route path="/patient/:patientId" element={<Patient />} />
          <Route path="/disease/:diseaseId" element={<Disease />} />
          <Route path="/medicine/:medicineId" element={<Medicine />} />
          <Route path="/newDoctor" element={<NewDoctor />} />
          <Route path="/newPatient" element={<NewPatient />} />
          <Route path="/newDisease" element={<NewDisease />} />
          <Route path="/newMedicine" element={<NewMedicine />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;