import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/doctor_appointments").then((r) => r.json()),
      fetch("/doctors").then((r) => r.json()),
      fetch("/patients").then((r) => r.json()),
    ])
      .then(([appts, docs, pats]) => {
        setAppointments(appts);
        setDoctors(docs);
        setPatients(pats);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    const res = await fetch(`/doctor_appointments/${id}`, { method: "DELETE" });
    if (res.ok) setAppointments((a) => a.filter((x) => x.id !== id));
  };

  const doctorName = (id) =>
    doctors.find((d) => String(d.id) === String(id))?.full_name || `#${id}`;
  const patientName = (id) =>
    patients.find((p) => String(p.id) === String(id))?.full_name || `#${id}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Appointments</h1>
        <NavLink
          to="/newappointment"
          className="inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 text-sm font-medium"
        >
          + Create
        </NavLink>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No appointments yet.</p>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="grid gap-3 md:hidden">
            {appointments.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-lg border shadow-sm p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{a.notes || "—"}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {a.date || "—"} · {a.time || "—"}
                    </p>
                  </div>
                </div>

                <dl className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Patient</dt>
                    <dd className="font-medium truncate">
                      {patientName(a.patient_id)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Doctor</dt>
                    <dd className="font-medium truncate">
                      {doctorName(a.doctor_id)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-3 flex gap-2">
                  <NavLink
                    to={`/appointment/${a.id}`}
                    className="flex-1 text-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 text-sm font-medium"
                  >
                    Detail
                  </NavLink>
                  <button
                    onClick={() => handleDelete(a.id)}
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
                  <th className="px-4 py-3 font-medium">Notes</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">
                    Time
                  </th>
                  <th className="px-4 py-3 font-medium">Doctor</th>
                  <th className="px-4 py-3 font-medium">Patient</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium max-w-[16rem] truncate">
                      {a.notes || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {a.date || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {a.time || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[12rem]">
                      {doctorName(a.doctor_id)}
                    </td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[12rem]">
                      {patientName(a.patient_id)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <NavLink
                          to={`/appointment/${a.id}`}
                          className="rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 text-xs font-medium"
                        >
                          Detail
                        </NavLink>
                        <button
                          onClick={() => handleDelete(a.id)}
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

export default AppointmentList;
