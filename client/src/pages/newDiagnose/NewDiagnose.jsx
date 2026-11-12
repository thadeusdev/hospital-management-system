import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NewDiagnose = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [patient_id, setPatientId] = useState("");
  const [doctor_id, setDoctorId] = useState("");
  const [disease_id, setDiseaseId] = useState("");
  const [performed_at, setPerformedAt] = useState("");
  const [pulse, setPulse] = useState("");
  const [sugar, setSugar] = useState("");
  const [temperature, setTemperature] = useState("");
  const [pressure, setPressure] = useState("");

  useEffect(() => {
    fetch("/patients")
      .then((r) => r.json())
      .then(setPatients);
    fetch("/doctors")
      .then((r) => r.json())
      .then(setDoctors);
    fetch("/diseases")
      .then((r) => r.json())
      .then(setDiseases);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/diagnostics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          patient_id,
          doctor_id,
          disease_id,
          performed_at,
          pulse,
          sugar,
          temperature,
          pressure,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.errors?.join(", ") || `HTTP ${res.status}`);
      }
      navigate("/diagnoses");
    } catch (err) {
      setError(err.message || "Failed to create diagnostic");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">New diagnostic</h1>
        <NavLink
          to="/diagnoses"
          className="inline-flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 text-sm font-medium"
        >
          ← Back
        </NavLink>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 text-red-700 text-sm px-3 py-2 border border-red-200">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border shadow-sm p-4 md:p-6 space-y-4"
      >
        <Field label="Name" required>
          <input
            type="text"
            required
            placeholder="Blood test"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Patient" required>
            <select
              required
              value={patient_id}
              onChange={(e) => setPatientId(e.target.value)}
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
          <Field label="Doctor" required>
            <select
              required
              value={doctor_id}
              onChange={(e) => setDoctorId(e.target.value)}
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
          <Field label="Disease" required>
            <select
              required
              value={disease_id}
              onChange={(e) => setDiseaseId(e.target.value)}
              className={inputCls}
            >
              <option value="">Select disease…</option>
              {diseases.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Performed at" required>
            <input
              type="time"
              required
              value={performed_at}
              onChange={(e) => setPerformedAt(e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Field label="Pulse">
            <input
              type="number"
              placeholder="100"
              value={pulse}
              onChange={(e) => setPulse(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Sugar">
            <input
              type="number"
              step="0.001"
              placeholder="0.231"
              value={sugar}
              onChange={(e) => setSugar(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Temperature">
            <input
              type="number"
              step="0.1"
              placeholder="36.1"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Pressure">
            <input
              type="number"
              step="0.1"
              placeholder="121.7"
              value={pressure}
              onChange={(e) => setPressure(e.target.value)}
              className={inputCls}
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
          <button
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 text-sm font-medium"
          >
            {submitting ? "Creating…" : "Create diagnostic"}
          </button>
        </div>
      </form>
    </div>
  );
};

const inputCls =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white";

const Field = ({ label, required, children }) => (
  <label className="block">
    <span className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </span>
    {children}
  </label>
);

export default NewDiagnose;
