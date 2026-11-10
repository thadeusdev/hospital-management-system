import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const DiseaseList = () => {
  const [diseases, setDiseases] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/diseases").then((r) => r.json()),
      fetch("/patients").then((r) => r.json()),
    ])
      .then(([dis, pats]) => {
        setDiseases(dis);
        setPatients(pats);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this disease?")) return;
    const res = await fetch(`/diseases/${id}`, { method: "DELETE" });
    if (res.ok) setDiseases((ds) => ds.filter((d) => d.id !== id));
  };

  const patientName = (id) =>
    patients.find((p) => String(p.id) === String(id))?.full_name || `#${id}`;

  const severityBadge = (severity) => {
    const s = String(severity || "").toLowerCase();
    if (s === "high") return "bg-red-100 text-red-700";
    if (s === "medium") return "bg-yellow-100 text-yellow-700";
    if (s === "low") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Diseases</h1>
        <NavLink
          to="/newDisease"
          className="inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 text-sm font-medium"
        >
          + Create
        </NavLink>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : diseases.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No diseases yet.</p>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="grid gap-3 md:hidden">
            {diseases.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-lg border shadow-sm p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{d.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      Patient: {patientName(d.patient_id)}
                    </p>
                  </div>
                  {d.severity && (
                    <span
                      className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${severityBadge(d.severity)}`}
                    >
                      {d.severity}
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Symptoms
                  </p>
                  <p className="text-sm text-gray-800 break-words">
                    {d.symptoms || "—"}
                  </p>
                </div>

                <div className="mt-3 flex gap-2">
                  <NavLink
                    to={`/disease/${d.id}`}
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
                  <th className="px-4 py-3 font-medium">Symptoms</th>
                  <th className="px-4 py-3 font-medium">Patient</th>
                  <th className="px-4 py-3 font-medium">Severity</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {diseases.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium truncate max-w-[12rem]">
                      {d.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[18rem]">
                      {d.symptoms || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[12rem]">
                      {patientName(d.patient_id)}
                    </td>
                    <td className="px-4 py-3">
                      {d.severity ? (
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${severityBadge(d.severity)}`}
                        >
                          {d.severity}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <NavLink
                          to={`/disease/${d.id}`}
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

export default DiseaseList;
