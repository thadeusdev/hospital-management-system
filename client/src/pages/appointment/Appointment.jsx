import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Accessible, AccessTime } from "@mui/icons-material";
import { FaUserMd } from "react-icons/fa";

const initial = {
  notes: "",
  date: "",
  time: "",
  patient_id: "",
  doctor_id: "",
};

const Appointment = () => {
  const [appt, setAppt] = useState(initial);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [saved, setSaved] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/doctor_appointments/${id}`)
      .then((r) => r.json())
      .then((a) => setAppt({ ...initial, ...a }))
      .catch(() => setAppt(initial));
  }, [id]);

  useEffect(() => {
    fetch("/doctors")
      .then((r) => r.json())
      .then(setDoctors);
    fetch("/patients")
      .then((r) => r.json())
      .then(setPatients);
  }, []);

  const handleEdit = (e) => {
    setSaved(false);
    setAppt({ ...appt, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`/doctor_appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        notes: appt.notes,
        date: appt.date,
        time: appt.time,
        patient_id: appt.patient_id,
        doctor_id: appt.doctor_id,
      }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(() => setSaved(true))
      .catch(() => setSaved(false));
  };

  // Names derived from the loaded lists, not from the API (which only returns ids)
  const patientName =
    patients.find((p) => String(p.id) === String(appt.patient_id))?.full_name ||
    "—";
  const doctorName =
    doctors.find((d) => String(d.id) === String(appt.doctor_id))?.full_name ||
    "—";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Edit appointment</h1>
        <NavLink
          to="/newappointment"
          className="inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 text-sm font-medium"
        >
          + Create
        </NavLink>
      </div>

      {saved && (
        <div className="mb-4 rounded-md bg-green-50 text-green-700 text-sm px-3 py-2 border border-green-200">
          Saved
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Read-only summary */}
        <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
          <div className="pb-4 border-b">
            <p className="font-semibold text-lg truncate">
              {appt.notes || "—"}
            </p>
            <p className="text-sm text-gray-500 truncate">{appt.date || "—"}</p>
          </div>

          <dl className="mt-4 space-y-3">
            <Row
              icon={<AccessTime fontSize="small" />}
              label="Time"
              value={appt.time || "—"}
            />
            <Row
              icon={<Accessible fontSize="small" />}
              label="Patient"
              value={patientName}
            />
            <Row icon={<FaUserMd />} label="Doctor" value={doctorName} />
          </dl>
        </div>

        {/* Edit form */}
        <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
          <h2 className="font-semibold mb-4">Edit</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Notes" className="md:col-span-2">
                <input
                  type="text"
                  name="notes"
                  value={appt.notes}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Date">
                <input
                  type="date"
                  name="date"
                  value={appt.date}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Time">
                <input
                  type="text"
                  name="time"
                  placeholder="10:00"
                  value={appt.time}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Patient">
                <select
                  name="patient_id"
                  value={appt.patient_id}
                  onChange={handleEdit}
                  className={inputCls}
                >
                  <option value="">Select patient…</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.full_name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Doctor">
                <select
                  name="doctor_id"
                  value={appt.doctor_id}
                  onChange={handleEdit}
                  className={inputCls}
                >
                  <option value="">Select doctor…</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.full_name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
              <NavLink
                to="/appointments"
                className="inline-flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 text-sm font-medium"
              >
                Cancel
              </NavLink>
              <button className="inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 text-sm font-medium">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputCls =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white";

const Field = ({ label, className = "", children }) => (
  <label className={`block ${className}`}>
    <span className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </span>
    {children}
  </label>
);

const Row = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <span className="text-gray-400 mt-0.5 shrink-0">{icon}</span>
    <div className="min-w-0">
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-800 break-words">{value}</dd>
    </div>
  </div>
);

export default Appointment;
