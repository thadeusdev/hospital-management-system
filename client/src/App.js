import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import DoctorsTable from './pages/DoctorsTable';
import PatientsTable from './pages/PatientsTable';
import AddDoctorForm from './pages/AddDoctorForm';
import AddPatientForm from './pages/AddPatientForm';
import DiseasesTable from './pages/DiseasesTable';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctors" element={<DoctorsTable />} />
          <Route path="/patients" element={<PatientsTable />} />
          <Route path="/addDoctor" element={<AddDoctorForm />} />
          <Route path="/addPatient" element={<AddPatientForm />} />
          <Route path="/diseases" element={<DiseasesTable />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>        
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
