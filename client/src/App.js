import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Appointment from "./pages/appointment/Appointment";
import AppointmentList from "./pages/appointmentList/AppointmentList";
import Dashboard from "./pages/dashboard/Dashboard";
import Diagnose from "./pages/diagnose/Diagnose";
import DiagnoseList from "./pages/diagnoseList/DiagnoseList";
import Disease from "./pages/disease/Disease";
import DiseaseList from "./pages/diseaseList/DiseaseList";
import Doctor from "./pages/doctor/Doctor";
import DoctorList from "./pages/doctorList/DoctorList";
import Medicine from "./pages/medicine/Medicine";
import MedicineList from "./pages/medicineList/MedicineList";
import NewAppointment from "./pages/newAppointment/NewAppointment";
import NewDiagnose from "./pages/newDiagnose/NewDiagnose";
import NewDisease from "./pages/newDisease/NewDisease";
import NewDoctor from "./pages/newDoctor/NewDoctor";
import NewMedicine from "./pages/newMedicine/NewMedicine";
import NewPatient from "./pages/newPatient/NewPatient";
import Patient from "./pages/patient/Patient";
import PatientList from "./pages/patientList/PatientList";
import Signup from "./pages/Registration/Signup/Signup";
import Login from "./pages/Registration/Login/Login";
import PrescriptionList from "./pages/prescriptionList/PrescriptionList";
import Prescription from "./pages/prescription/Prescription";
import NewPrescription from "./pages/newPrescription/NewPrescription";
import Alerts from "./pages/alerts/Alerts";
import User from "./pages/user/User";

const App = () => {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) response.json().then(setUser);
    });
  }, []);

  if (!user) {
    return (
      <div className="auth">
        <BrowserRouter>
          <Routes>
            <Route path="/"       element={<Login  onLogin={setUser} />} />
            <Route path="/login"  element={<Login  onLogin={setUser} />} />
            <Route path="/signup" element={<Signup onLogin={setUser} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Topbar
          user={user}
          setUser={setUser}
          onOpenMobile={() => setMobileOpen(true)}
        />

        <div className="flex-1 flex min-h-0">
          <Sidebar
            user={user}
            setUser={setUser}
            mobileOpen={mobileOpen}
            onCloseMobile={() => setMobileOpen(false)}
          >
            <Routes>
              {/* Dashboard */}
              <Route path="/"          element={<Dashboard user={user} setUser={setUser} />} />
              <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />

              {/* Appointments */}
              <Route path="/appointment"    element={<AppointmentList user={user} setUser={setUser} />} />
              <Route path="/appointment/:id" element={<Appointment     user={user} setUser={setUser} />} />
              <Route path="/newAppointment" element={<NewAppointment  user={user} setUser={setUser} />} />

              {/* Doctors */}
              <Route path="/doctors"      element={<DoctorList user={user} setUser={setUser} />} />
              <Route path="/doctor/:id"   element={<Doctor     user={user} setUser={setUser} />} />
              <Route path="/newDoctor"    element={<NewDoctor  user={user} setUser={setUser} />} />

              {/* Patients */}
              <Route path="/patients"      element={<PatientList user={user} setUser={setUser} />} />
              <Route path="/patient/:id"   element={<Patient     user={user} setUser={setUser} />} />
              <Route path="/newPatient"    element={<NewPatient  user={user} setUser={setUser} />} />

              {/* Diseases */}
              <Route path="/diseases"      element={<DiseaseList user={user} setUser={setUser} />} />
              <Route path="/disease/:id"   element={<Disease     user={user} setUser={setUser} />} />
              <Route path="/newDisease"    element={<NewDisease  user={user} setUser={setUser} />} />

              {/* Diagnoses */}
              <Route path="/diagnoses"     element={<DiagnoseList user={user} setUser={setUser} />} />
              <Route path="/diagnose/:id"  element={<Diagnose     user={user} setUser={setUser} />} />
              <Route path="/newDiagnose"   element={<NewDiagnose  user={user} setUser={setUser} />} />

              {/* Medicines */}
              <Route path="/medicines"     element={<MedicineList user={user} setUser={setUser} />} />
              <Route path="/medicine/:id"  element={<Medicine     user={user} setUser={setUser} />} />
              <Route path="/newMedicine"   element={<NewMedicine  user={user} setUser={setUser} />} />

              {/* Prescriptions */}
              <Route path="/prescriptions"     element={<PrescriptionList user={user} setUser={setUser} />} />
              <Route path="/prescriptions/:id" element={<Prescription     user={user} setUser={setUser} />} />
              <Route path="/newPrescription"   element={<NewPrescription  user={user} setUser={setUser} />} />

              {/* Alerts */}
              <Route path="/alerts" element={<Alerts user={user} setUser={setUser} />} />

              {/* User profile */}
              <Route path="/users/:id" element={<User user={user} setUser={setUser} />} />
            </Routes>
          </Sidebar>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;