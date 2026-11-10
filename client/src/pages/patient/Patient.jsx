import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import { FaCalendarAlt } from "react-icons/fa";
import { Verified } from "@mui/icons-material";

const initial = {
  image: "",
  full_name: "",
  age: "",
  gender: "",
  address: "",
  visiting_date: "",
  visit_no: "",
};

const Patient = () => {
  const [patient, setPatient] = useState(initial);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`/patients/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((p) => setPatient({ ...initial, ...p }))
      .catch(() => setError("Unable to load patient"));
  }, [id]);

  const handleEdit = (e) => {
    setSaved(false);
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/patients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          image: patient.image,
          full_name: patient.full_name,
          age: patient.age,
          gender: patient.gender,
          address: patient.address,
          visiting_date: patient.visiting_date,
          visit_no: patient.visit_no,
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Edit patient</h1>
        <NavLink
          to="/newPatient"
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
          <div className="flex items-center gap-4 pb-4 border-b">
            <img
              src={patient.image || "/default-avatar.png"}
              alt=""
              className="w-16 h-16 rounded-full object-cover bg-gray-100 shrink-0"
            />
            <div className="min-w-0">
              <p className="font-semibold text-lg truncate">
                {patient.full_name || "—"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {patient.age ? `${patient.age} yrs` : "—"}
              </p>
            </div>
          </div>

          <dl className="mt-4 space-y-3">
            <Row
              icon={<Verified fontSize="small" />}
              label="Gender"
              value={patient.gender}
            />
            <Row
              icon={<PlaceIcon fontSize="small" />}
              label="Address"
              value={patient.address}
            />
            <Row
              icon={<FaCalendarAlt />}
              label="Visit date"
              value={patient.visiting_date}
            />
            <Row
              icon={<FaCalendarAlt />}
              label="Visit number"
              value={patient.visit_no}
            />
          </dl>
        </div>

        {/* Edit form */}
        <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
          <h2 className="font-semibold mb-4">Edit</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Full name">
                <input
                  type="text"
                  name="full_name"
                  value={patient.full_name}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Age">
                <input
                  type="number"
                  min="0"
                  name="age"
                  value={patient.age}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Gender">
                <input
                  type="text"
                  name="gender"
                  value={patient.gender}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Address">
                <input
                  type="text"
                  name="address"
                  value={patient.address}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Visit date">
                <input
                  type="date"
                  name="visiting_date"
                  value={patient.visiting_date}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Visit number">
                <input
                  type="text"
                  name="visit_no"
                  value={patient.visit_no}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Image URL" className="md:col-span-2">
                <input
                  type="text"
                  name="image"
                  value={patient.image}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
              <NavLink
                to="/patients"
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

export default Patient;