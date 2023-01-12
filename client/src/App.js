import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Appointment from './pages/appointment/Appointment';
import AppointmentList from './pages/appointmentList/AppointmentList';
import Dashboard from './pages/dashboard/Dashboard';
import Diagnose from './pages/diagnose/Diagnose';
import DiagnoseList from './pages/diagnoseList/DiagnoseList';
import Disease from './pages/disease/Disease';
import DiseaseList from './pages/diseaseList/DiseaseList';
import Doctor from './pages/doctor/Doctor';
import DoctorList from './pages/doctorList/DoctorList';
import Medicine from './pages/medicine/Medicine';
import MedicineList from './pages/medicineList/MedicineList';
import NewAppointment from './pages/newAppointment/NewAppointment';
import NewDiagnose from './pages/newDiagnose/NewDiagnose';
import NewDisease from './pages/newDisease/NewDisease';
import NewDoctor from './pages/newDoctor/NewDoctor';
import NewMedicine from './pages/newMedicine/NewMedicine';
import NewPatient from './pages/newPatient/NewPatient';
import Patient from './pages/patient/Patient';
import PatientList from './pages/patientList/PatientList';
import Signup from './pages/Registration/Signup/Signup';
import Login from './pages/Registration/Login/Login';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (user) {
    return (
      <>      
      {/* <Login/> */}
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
            <Route path="/doctor/:id" element={<Doctor />} />
            <Route path="/appointment/:id" element={<Appointment />} />
            <Route path="/patient/:id" element={<Patient />} />
            <Route path="/disease/:id" element={<Disease />} />
            <Route path="/diagnose/:id" element={<Diagnose />} />
            <Route path="/medicine/:id" element={<Medicine />} />
            <Route path="/newDoctor" element={<NewDoctor />} />
            <Route path="/newPatient" element={<NewPatient />} />
            <Route path="/newAppointment" element={<NewAppointment />} />
            <Route path="/newDisease" element={<NewDisease />} />
            <Route path="/newMedicine" element={<NewMedicine />} />
            <Route path="/newDiagnose" element={<NewDiagnose />} />
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
      </>
    );
  } else {
    return <Login onLogin={setUser} />;
  }
  // return (
  //   <>
  //   <LandingPage />
  //   {/* <Login/>
  //   <BrowserRouter>    
  //   <Topbar/>
  //     <Sidebar>      
  //       <Routes>
  //         <Route path="/" element={<Dashboard />} />
  //         <Route path="/dashboard" element={<Dashboard />} />
  //         <Route path="/appointment" element={<AppointmentList />} />
  //         <Route path="/doctors" element={<DoctorList />} />
  //         <Route path="/patients" element={<PatientList />} />
  //         <Route path="/diseases" element={<DiseaseList />} />
  //         <Route path="/diagnoses" element={<DiagnoseList />} />
  //         <Route path="/medicines" element={<MedicineList />} />
  //         <Route path="/doctor/:id" element={<Doctor />} />
  //         <Route path="/appointment/:id" element={<Appointment />} />
  //         <Route path="/patient/:id" element={<Patient />} />
  //         <Route path="/disease/:id" element={<Disease />} />
  //         <Route path="/diagnose/:id" element={<Diagnose />} />
  //         <Route path="/medicine/:id" element={<Medicine />} />
  //         <Route path="/newDoctor" element={<NewDoctor />} />
  //         <Route path="/newPatient" element={<NewPatient />} />
  //         <Route path="/newAppointment" element={<NewAppointment />} />
  //         <Route path="/newDisease" element={<NewDisease />} />
  //         <Route path="/newMedicine" element={<NewMedicine />} />
  //         <Route path="/newDiagnose" element={<NewDiagnose />} />
  //         <Route path="/Signup" element={<Signup/>}/>
  //         <Route path="/Login" element={<Login />} />
  //         <Route path="/Logout" element={<Logout />} />
  //       </Routes>
  //     </Sidebar>
  //   </BrowserRouter> */}
  //   </>
  // );
};

export default App;