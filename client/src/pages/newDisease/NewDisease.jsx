import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NewDisease = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [patient_id, setPatientId] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    fetch("/patients")
      .then((r) => r.json())
      .then(setPatients)
      .catch(() => setPatients([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/diseases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, symptoms, severity, patient_id }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.errors?.join(", ") || `HTTP ${res.status}`);
      }
      navigate("/diseases");
    } catch (err) {
      setError(err.message || "Failed to create disease");
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-full bg-gray-50">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              New disease
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Record a new disease case for a patient
            </p>
          </div>
          <NavLink
            to="/diseases"
            className="inline-flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 text-sm font-medium whitespace-nowrap"
          >
            ← Back
          </NavLink>
        </div>

        {error && (
          <div className="mb-4 w-full rounded-md bg-red-50 text-red-700 text-sm px-3 py-2 border border-red-200">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 space-y-4"
        >
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

             <Field label="Name" required>
            <input
              type="text"
              required
              placeholder="Typhoid"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
            />
          </Field>

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

          <Field label="Symptoms" required>
            <input
              type="text"
              required
              placeholder="fever, headache"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Severity" required>
            <select
              required
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className={inputCls}
            >
              <option value="">Select severity…</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </Field>

          <div className="w-full flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
            <NavLink
              to="/diseases"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 text-sm font-medium"
            >
              Cancel
            </NavLink>
            <button
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 text-sm font-medium"
            >
              {submitting ? "Creating…" : "Create disease"}
            </button>
          </div>

           </div>
         
        </form>
      </div>
    </div>
  );
};

const inputCls =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500";

const Field = ({ label, required, children }) => (
  <label className="block w-full">
    <span className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </span>
    {children}
  </label>
);

export default NewDisease;
