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
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;