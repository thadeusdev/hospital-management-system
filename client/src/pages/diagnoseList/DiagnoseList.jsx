import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const DiagnoseList = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/diagnostics").then((r) => r.json()),
      fetch("/patients").then((r) => r.json()),
      fetch("/doctors").then((r) => r.json()),
      fetch("/diseases").then((r) => r.json()),
    ])
      .then(([dx, pats, docs, dis]) => {
        setDiagnoses(dx);
        setPatients(pats);
        setDoctors(docs);
        setDiseases(dis);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this diagnostic?")) return;
    const res = await fetch(`/diagnostics/${id}`, { method: "DELETE" });
    if (res.ok) setDiagnoses((ds) => ds.filter((d) => d.id !== id));
  };

  const patientName = (id) =>
    patients.find((p) => String(p.id) === String(id))?.full_name || `#${id}`;
  const doctorName = (id) =>
    doctors.find((d) => String(d.id) === String(id))?.full_name || `#${id}`;
  const diseaseName = (id) =>
    diseases.find((d) => String(d.id) === String(id))?.name || `#${id}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Diagnoses</h1>
        <NavLink
          to="/newDiagnose"
          className="inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 text-sm font-medium"
        >
          + Create
        </NavLink>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : diagnoses.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No diagnoses yet.</p>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="grid gap-3 md:hidden">
            {diagnoses.map((d) => (
              <div key={d.id} className="bg-white rounded-lg border shadow-sm p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{d.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {d.performed_at || "—"}
                    </p>
                  </div>
                </div>

                <dl className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Patient</dt>
                    <dd className="font-medium truncate">{patientName(d.patient_id)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Doctor</dt>
                    <dd className="font-medium truncate">{doctorName(d.doctor_id)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Disease</dt>
                    <dd className="font-medium truncate">{diseaseName(d.disease_id)}</dd>
                  </div>
                </dl>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <Metric label="Pulse" value={d.pulse} />
                  <Metric label="Sugar" value={d.sugar} />
                  <Metric label="Temp" value={d.temperature} suffix="°C" />
                  <Metric label="Pressure" value={d.pressure} />
                </div>

                <div className="mt-3 flex gap-2">
                  <NavLink
                    to={`/diagnose/${d.id}`}
                    className="flex-1 text-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 text-sm font-medium"
                  >
                    Detail
                  </NavLink>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="rounded-md border border-red-200 text-red-600 hover:bg-red-50 px-2.5 py-1.5"
                    aria-label="Delete"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto rounded-lg border bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Performed at</th>
                  <th className="px-4 py-3 font-medium">Patient</th>
                  <th className="px-4 py-3 font-medium">Doctor</th>
                  <th className="px-4 py-3 font-medium">Disease</th>
                  <th className="px-4 py-3 font-medium text-right">Pulse</th>
                  <th className="px-4 py-3 font-medium text-right">Sugar</th>
                  <th className="px-4 py-3 font-medium text-right whitespace-nowrap">Temp</th>
                  <th className="px-4 py-3 font-medium text-right">Pressure</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {diagnoses.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium truncate max-w-[10rem]">{d.name}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{d.performed_at || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[10rem]">{patientName(d.patient_id)}</td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[10rem]">{doctorName(d.doctor_id)}</td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[10rem]">{diseaseName(d.disease_id)}</td>
                    <td className="px-4 py-3 text-right">{d.pulse ?? "—"}</td>
                    <td className="px-4 py-3 text-right">{d.sugar ?? "—"}</td>
                    <td className="px-4 py-3 text-right">{d.temperature ?? "—"}</td>
                    <td className="px-4 py-3 text-right">{d.pressure ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <NavLink
                          to={`/diagnose/${d.id}`}
                          className="rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 text-xs font-medium"
                        >
                          Detail
                        </NavLink>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="rounded-md border border-red-200 text-red-600 hover:bg-red-50 px-2 py-1.5"
                          aria-label="Delete"
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

const Metric = ({ label, value, suffix = "" }) => (
  <div className="bg-gray-50 rounded-md px-2 py-1.5">
    <p className="text-gray-500">{label}</p>
    <p className="font-medium">
      {value ?? "—"}
      {value != null && suffix}
    </p>
  </div>
);

export default DiagnoseList;