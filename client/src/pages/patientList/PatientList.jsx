import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/patients")
      .then((r) => r.json())
      .then(setPatients)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this patient?")) return;
    const res = await fetch(`/patients/${id}`, { method: "DELETE" });
    if (res.ok) setPatients((ps) => ps.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Patients</h1>
        <NavLink
          to="/newPatient"
          className="inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 text-sm font-medium"
        >
          + Create
        </NavLink>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : patients.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No patients yet.</p>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="grid gap-3 md:hidden">
            {patients.map((p) => (
              <div key={p.id} className="bg-white rounded-lg border shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={p.image || "/default-avatar.png"}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover bg-gray-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{p.full_name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {p.age ? `${p.age} yrs` : "—"}
                      {p.gender ? ` · ${p.gender}` : ""}
                    </p>
                  </div>
                </div>

                <dl className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Address</dt>
                    <dd className="font-medium truncate">{p.address || "—"}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Visit date</dt>
                    <dd className="font-medium">{p.visiting_date || "—"}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Visit number</dt>
                    <dd className="font-medium truncate">{p.visit_no || "—"}</dd>
                  </div>
                </dl>

                <div className="mt-3 flex gap-2">
                  <NavLink
                    to={`/patient/${p.id}`}
                    className="flex-1 text-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 text-sm font-medium"
                  >
                    Detail
                  </NavLink>
                  <button
                    onClick={() => handleDelete(p.id)}
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
                  <th className="px-4 py-3 font-medium">Full name</th>
                  <th className="px-4 py-3 font-medium text-right">Age</th>
                  <th className="px-4 py-3 font-medium">Gender</th>
                  <th className="px-4 py-3 font-medium">Address</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Visit date</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Visit number</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {patients.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.image || "/default-avatar.png"}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover bg-gray-100 shrink-0"
                        />
                        <span className="font-medium truncate max-w-[12rem]">
                          {p.full_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">{p.age || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{p.gender || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[14rem]">
                      {p.address || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {p.visiting_date || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {p.visit_no || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <NavLink
                          to={`/patient/${p.id}`}
                          className="rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 text-xs font-medium"
                        >
                          Detail
                        </NavLink>
                        <button
                          onClick={() => handleDelete(p.id)}
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

export default PatientList;