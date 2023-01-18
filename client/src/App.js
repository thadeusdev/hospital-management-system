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
import PrescriptionList from './pages/prescriptionList/PrescriptionList'
import Prescription from './pages/prescription/Prescription';
import NewPrescription from './pages/newPrescription/NewPrescription';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if (!user) return (
  //     <BrowserRouter>
  //     <Routes>
  //       <Route path='/' element={<Login onLogin={setUser} />}>
  //       </Route>
  //       <Route path='/Signup'element= {<Signup onLogin={setUser}/>}>
  //       </Route>
  //       <Route path='/Login' element={<Login onLogin={setUser} />}>
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  // );

  if (user) {
    return (
      <BrowserRouter>  
      <Topbar user={user} setUser={setUser}/>
        <Sidebar user={user} setUser={setUser}>      
          <Routes>
            <Route exact path="/" element={<Dashboard user={user} setUser={setUser} />} />
            <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
            <Route path="/appointment" element={<AppointmentList user={user} setUser={setUser} />} />
            <Route path="/doctors" element={<DoctorList user={user} setUser={setUser} />} />
            <Route path="/patients" element={<PatientList user={user} setUser={setUser} />} />
            <Route path="/diseases" element={<DiseaseList user={user} setUser={setUser} />} />
            <Route path="/diagnoses" element={<DiagnoseList user={user} setUser={setUser} />} />
            <Route path="/medicines" element={<MedicineList user={user} setUser={setUser} />} />
            <Route path="/doctor/:id" element={<Doctor user={user} setUser={setUser} />} />
            <Route path="/appointment/:id" element={<Appointment user={user} setUser={setUser} />} />
            <Route path="/patient/:id" element={<Patient user={user} setUser={setUser} />} />
            <Route path="/disease/:id" element={<Disease user={user} setUser={setUser} />} />
            <Route path="/diagnose/:id" element={<Diagnose user={user} setUser={setUser} />} />
            <Route path="/medicine/:id" element={<Medicine user={user} setUser={setUser} />} />
            <Route path="/newDoctor" element={<NewDoctor user={user} setUser={setUser} />} />
            <Route path="/newPatient" element={<NewPatient user={user} setUser={setUser} />} />
            <Route path="/newAppointment" element={<NewAppointment user={user} setUser={setUser} />} />
            <Route path="/newDisease" element={<NewDisease user={user} setUser={setUser} />} />
            <Route path="/newMedicine" element={<NewMedicine user={user} setUser={setUser} />} />
            <Route path="/newDiagnose" element={<NewDiagnose user={user} setUser={setUser} />} />
            <Route path='/prescriptions' element={<PrescriptionList user={user} setUser={setUser} />} />
            <Route path='/prescriptions/:id' element={<Prescription user={user} setUser={setUser} />} />
            <Route path="/newPrescription" element={<NewPrescription user={user} setUser={setUser} />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    );
  } else {
    return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login onLogin={setUser} />}>
        </Route>
        <Route path='/Signup'element= {<Signup onLogin={setUser}/>}>
        </Route>
        <Route path='/Login' element={<Login onLogin={setUser} />}>
        </Route>
      </Routes>
    </BrowserRouter>
    );
  }
};

export default App;