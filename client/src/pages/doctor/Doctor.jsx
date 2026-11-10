import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import BadgeIcon from "@mui/icons-material/Badge";
import { WorkspacePremium } from "@mui/icons-material";

const initial = {
  image: "",
  full_name: "",
  email: "",
  primary_practice: "",
  secondary_practice: "",
  years_of_experience: "",
};

const Doctor = () => {
  const [doctor, setDoctor] = useState(initial);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`/doctors/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setDoctor({ ...initial, ...d }))
      .catch(() => setError("Unable to load doctor"));
  }, [id]);

  const handleEdit = (e) => {
    setSaved(false);
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/doctors/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          image: doctor.image,
          full_name: doctor.full_name,
          email: doctor.email,
          primary_practice: doctor.primary_practice,
          secondary_practice: doctor.secondary_practice,
          years_of_experience: doctor.years_of_experience,
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
        <h1 className="text-xl md:text-2xl font-bold">Edit doctor</h1>
        <NavLink
          to="/newDoctor"
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
              src={doctor.image || "/default-avatar.png"}
              alt=""
              className="w-16 h-16 rounded-full object-cover bg-gray-100 shrink-0"
            />
            <div className="min-w-0">
              <p className="font-semibold text-lg truncate">
                {doctor.full_name || "—"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {doctor.email || "—"}
              </p>
            </div>
          </div>

          <dl className="mt-4 space-y-3">
            <Row
              icon={<BadgeIcon fontSize="small" />}
              label="Primary practice"
              value={doctor.primary_practice}
            />
            <Row
              icon={<BadgeIcon fontSize="small" />}
              label="Secondary practice"
              value={doctor.secondary_practice}
            />
            <Row
              icon={<WorkspacePremium fontSize="small" />}
              label="Experience"
              value={
                doctor.years_of_experience
                  ? `${doctor.years_of_experience} years`
                  : "—"
              }
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
                  value={doctor.full_name}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  name="email"
                  value={doctor.email}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Primary practice">
                <input
                  type="text"
                  name="primary_practice"
                  value={doctor.primary_practice}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Secondary practice">
                <input
                  type="text"
                  name="secondary_practice"
                  value={doctor.secondary_practice}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Years of experience">
                <input
                  type="number"
                  min="0"
                  name="years_of_experience"
                  value={doctor.years_of_experience}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Image URL">
                <input
                  type="text"
                  name="image"
                  value={doctor.image}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
              <NavLink
                to="/doctors"
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

const Field = ({ label, children }) => (
  <label className="block">
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
      <dd className="text-sm text-gray-800 break-words">{value || "—"}</dd>
    </div>
  </div>
);

export default Doctor;
