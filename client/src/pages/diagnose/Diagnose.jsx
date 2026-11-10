import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const initial = {
  name: "",
  patient_id: "",
  doctor_id: "",
  disease_id: "",
  performed_at: "",
  pulse: "",
  sugar: "",
  temperature: "",
  pressure: "",
};

const Diagnose = () => {
  const [diagnose, setDiagnose] = useState(initial);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch("/patients").then((r) => r.json()).then(setPatients);
    fetch("/doctors").then((r) => r.json()).then(setDoctors);
    fetch("/diseases").then((r) => r.json()).then(setDiseases);
  }, []);

  useEffect(() => {
    fetch(`/diagnostics/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setDiagnose({ ...initial, ...d }))
      .catch(() => setError("Unable to load diagnostic"));
  }, [id]);

  const handleEdit = (e) => {
    setSaved(false);
    setDiagnose({ ...diagnose, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/diagnostics/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: diagnose.name,
          patient_id: diagnose.patient_id,
          doctor_id: diagnose.doctor_id,
          disease_id: diagnose.disease_id,
          performed_at: diagnose.performed_at,
          pulse: diagnose.pulse,
          sugar: diagnose.sugar,
          temperature: diagnose.temperature,
          pressure: diagnose.pressure,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.errors?.join(", ") || `HTTP ${res.status}`);
      }
      setSaved(true);
    } catch (err) {
      setError(err.message || "Failed to save");
    }
  };

  // Chart data comes from the CURRENT diagnostic, not a hardcoded array
  const chartData = [
    {
      name: diagnose.name || "Reading",
      sugar: Number(diagnose.sugar) || 0,
      pressure: Number(diagnose.pressure) || 0,
      pulse: Number(diagnose.pulse) || 0,
      temperature: Number(diagnose.temperature) || 0,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Edit diagnostic</h1>
        <NavLink
          to="/newDiagnose"
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
      {error && (
        <div className="mb-4 rounded-md bg-red-50 text-red-700 text-sm px-3 py-2 border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart panel */}
        <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
          <h2 className="font-semibold mb-4">Vitals</h2>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sugar"       fill="#3b82f6" />
                <Bar dataKey="pressure"    fill="#10b981" />
                <Bar dataKey="pulse"       fill="#f59e0b" />
                <Bar dataKey="temperature" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Updates as you edit — reflects saved values after save
          </p>
        </div>

        {/* Edit form */}
        <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
          <h2 className="font-semibold mb-4">Edit</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name" className="md:col-span-2">
                <input
                  type="text" name="name" value={diagnose.name}
                  onChange={handleEdit} className={inputCls}
                />
              </Field>

              <Field label="Patient">
                <select name="patient_id" value={diagnose.patient_id} onChange={handleEdit} className={inputCls}>
                  <option value="">Select patient…</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.full_name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Doctor">
                <select name="doctor_id" value={diagnose.doctor_id} onChange={handleEdit} className={inputCls}>
                  <option value="">Select doctor…</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>{d.full_name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Disease">
                <select name="disease_id" value={diagnose.disease_id} onChange={handleEdit} className={inputCls}>
                  <option value="">Select disease…</option>
                  {diseases.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Performed at">
                <input
                  type="text" name="performed_at" placeholder="13:00"
                  value={diagnose.performed_at} onChange={handleEdit} className={inputCls}
                />
              </Field>

              <Field label="Pulse">
                <input
                  type="number" name="pulse" value={diagnose.pulse}
                  onChange={handleEdit} className={inputCls}
                />
              </Field>
              <Field label="Sugar">
                <input
                  type="number" step="0.001" name="sugar" value={diagnose.sugar}
                  onChange={handleEdit} className={inputCls}
                />
              </Field>
              <Field label="Temperature">
                <input
                  type="number" step="0.1" name="temperature" value={diagnose.temperature}
                  onChange={handleEdit} className={inputCls}
                />
              </Field>
              <Field label="Pressure">
                <input
                  type="number" step="0.1" name="pressure" value={diagnose.pressure}
                  onChange={handleEdit} className={inputCls}
                />
              </Field>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
              <NavLink
                to="/diagnoses"
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
    <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
    {children}
  </label>
);

export default Diagnose;