import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  FaAccessibleIcon,
  FaDisease,
  FaTablets,
  FaUserMd,
} from "react-icons/fa";

const initial = {
  frequency: "",
  duration: "",
  medicine_id: "",
  disease_id: "",
  patient_id: "",
  doctor_id: "",
};

const Prescription = () => {
  const [prescription, setPrescription] = useState(initial);
  const [medicines, setMedicines] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    Promise.all([
      fetch("/medicines").then((r) => r.json()),
      fetch("/diseases").then((r) => r.json()),
      fetch("/patients").then((r) => r.json()),
      fetch("/doctors").then((r) => r.json()),
    ]).then(([meds, dis, pats, docs]) => {
      setMedicines(meds);
      setDiseases(dis);
      setPatients(pats);
      setDoctors(docs);
    });
  }, []);

  useEffect(() => {
    fetch(`/prescriptions/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((p) => setPrescription({ ...initial, ...p }))
      .catch(() => setError("Unable to load prescription"));
  }, [id]);

  const handleEdit = (e) => {
    setSaved(false);
    setPrescription({ ...prescription, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/prescriptions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          frequency: prescription.frequency,
          duration: prescription.duration,
          medicine_id: prescription.medicine_id,
          disease_id: prescription.disease_id,
          patient_id: prescription.patient_id,
          doctor_id: prescription.doctor_id,
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

  const medicineName =
    medicines.find((m) => String(m.id) === String(prescription.medicine_id))
      ?.name || "—";
  const diseaseName =
    diseases.find((d) => String(d.id) === String(prescription.disease_id))
      ?.name || "—";
  const patientName =
    patients.find((p) => String(p.id) === String(prescription.patient_id))
      ?.full_name || "—";
  const doctorName =
    doctors.find((d) => String(d.id) === String(prescription.doctor_id))
      ?.full_name || "—";

  return (
    <div className="w-full min-h-full bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Edit prescription
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Update an existing prescription
            </p>
          </div>
          <NavLink
            to="/newPrescription"
            className="inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 text-sm font-medium whitespace-nowrap"
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
          <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
            <div className="pb-4 border-b border-gray-100">
              <p className="font-semibold text-lg text-gray-900 truncate">
                Frequency: {prescription.frequency || "—"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                Duration: {prescription.duration || "—"}
              </p>
            </div>

            <dl className="mt-4 space-y-3">
              <Row icon={<FaTablets />} label="Medicine" value={medicineName} />
              <Row icon={<FaDisease />} label="Disease" value={diseaseName} />
              <Row icon={<FaUserMd />} label="Doctor" value={doctorName} />
              <Row
                icon={<FaAccessibleIcon />}
                label="Patient"
                value={patientName}
              />
            </dl>
          </div>

          {/* Edit form */}
          <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
            <h2 className="font-semibold mb-4 text-gray-900">Edit</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Frequency">
                  <input
                    type="text"
                    name="frequency"
                    placeholder="2 X 2"
                    value={prescription.frequency}
                    onChange={handleEdit}
                    className={inputCls}
                  />
                </Field>
                <Field label="Duration">
                  <input
                    type="text"
                    name="duration"
                    placeholder="7 days"
                    value={prescription.duration}
                    onChange={handleEdit}
                    className={inputCls}
                  />
                </Field>
                <Field label="Medicine">
                  <select
                    name="medicine_id"
                    value={prescription.medicine_id}
                    onChange={handleEdit}
                    className={inputCls}
                  >
                    <option value="">Select medicine…</option>
                    {medicines.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Disease">
                  <select
                    name="disease_id"
                    value={prescription.disease_id}
                    onChange={handleEdit}
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
                <Field label="Patient">
                  <select
                    name="patient_id"
                    value={prescription.patient_id}
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
                    value={prescription.doctor_id}
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

              <div className="w-full flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t border-gray-100 mt-6">
                <NavLink
                  to="/prescriptions"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 text-sm font-medium"
                >
                  Cancel
                </NavLink>
                <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 text-sm font-medium">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputCls =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500";

const Field = ({ label, children }) => (
  <label className="block w-full">
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

export default Prescription;
