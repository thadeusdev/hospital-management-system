import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/doctors")
      .then((r) => r.json())
      .then(setDoctors)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;
    const res = await fetch(`/doctors/${id}`, { method: "DELETE" });
    if (res.ok) setDoctors((ds) => ds.filter((d) => d.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Doctors</h1>
        <NavLink
          to="/newDoctor"
          className="inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 text-sm font-medium"
        >
          + Create
        </NavLink>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : doctors.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No doctors yet.</p>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="grid gap-3 md:hidden">
            {doctors.map((d) => (
              <div key={d.id} className="bg-white rounded-lg border shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={d.image || "/default-avatar.png"}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover bg-gray-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{d.full_name}</p>
                    <p className="text-sm text-gray-500 truncate">{d.email}</p>
                  </div>
                </div>

                <dl className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Primary</dt>
                    <dd className="font-medium truncate">{d.primary_practice || "—"}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Secondary</dt>
                    <dd className="font-medium truncate">{d.secondary_practice || "—"}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Experience</dt>
                    <dd className="font-medium">{d.years_of_experience} yrs</dd>
                  </div>
                </dl>

                <div className="mt-3 flex gap-2">
                  <NavLink
                    to={`/doctor/${d.id}`}
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
                  <th className="px-4 py-3 font-medium">Full name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Primary practice</th>
                  <th className="px-4 py-3 font-medium">Secondary practice</th>
                  <th className="px-4 py-3 font-medium text-right">Experience</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {doctors.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={d.image || "/default-avatar.png"}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover bg-gray-100 shrink-0"
                        />
                        <span className="font-medium truncate max-w-[12rem]">
                          {d.full_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[14rem]">
                      {d.email}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{d.primary_practice || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{d.secondary_practice || "—"}</td>
                    <td className="px-4 py-3 text-right">{d.years_of_experience} yrs</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <NavLink
                          to={`/doctor/${d.id}`}
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

export default DoctorList;