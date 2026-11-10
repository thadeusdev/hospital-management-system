import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import SevereColdIcon from "@mui/icons-material/SevereCold";
import VerifiedIcon from "@mui/icons-material/Verified";

const initial = {
  name: "",
  patient_id: "",
  symptoms: "",
  severity: "",
};

const Disease = () => {
  const [disease, setDisease] = useState(initial);
  const [patients, setPatients] = useState([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`/diseases/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setDisease({ ...initial, ...d }))
      .catch(() => setError("Unable to load disease"));
  }, [id]);

  useEffect(() => {
    fetch("/patients").then((r) => r.json()).then(setPatients);
  }, []);

  const handleEdit = (e) => {
    setSaved(false);
    setDisease({ ...disease, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/diseases/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: disease.name,
          patient_id: disease.patient_id,
          symptoms: disease.symptoms,
          severity: disease.severity,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.errors?.join(", ") || `HTTP ${res.status}`);
      }
      const updated = await res.json();
      setDisease({ ...disease, ...updated });
      setSaved(true);
    } catch (err) {
      setError(err.message || "Failed to save");
    }
  };

  const patientName =
    patients.find((p) => String(p.id) === String(disease.patient_id))?.full_name ||
    "—";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Edit disease</h1>
        <NavLink
          to="/newDisease"
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
        {/* Read-only summary */}
        <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
          <div className="pb-4 border-b">
            <p className="font-semibold text-lg truncate">
              {disease.name || "—"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              Patient: {patientName}
            </p>
          </div>

          <dl className="mt-4 space-y-3">
            <Row
              icon={<CoronavirusIcon fontSize="small" />}
              label="Disease"
              value={disease.name}
            />
            <Row
              icon={<VerifiedIcon fontSize="small" />}
              label="Symptoms"
              value={disease.symptoms}
            />
            <Row
              icon={<SevereColdIcon fontSize="small" />}
              label="Severity"
              value={disease.severity}
            />
          </dl>
        </div>

        {/* Edit form */}
        <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
          <h2 className="font-semibold mb-4">Edit</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name">
                <input
                  type="text"
                  name="name"
                  value={disease.name}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Patient">
                <select
                  name="patient_id"
                  value={disease.patient_id}
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
              <Field label="Symptoms" className="md:col-span-2">
                <input
                  type="text"
                  name="symptoms"
                  value={disease.symptoms}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Severity">
                <select
                  name="severity"
                  value={disease.severity}
                  onChange={handleEdit}
                  className={inputCls}
                >
                  <option value="">Select severity…</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </Field>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
              <NavLink
                to="/diseases"
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

const Row = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <span className="text-gray-400 mt-0.5 shrink-0">{icon}</span>
    <div className="min-w-0">
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-800 break-words">{value || "—"}</dd>
    </div>
  </div>
);

export default Disease;