import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/medicines")
      .then((r) => r.json())
      .then(setMedicines)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;
    const res = await fetch(`/medicines/${id}`, { method: "DELETE" });
    if (res.ok) setMedicines((ms) => ms.filter((m) => m.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Medicines</h1>
        <NavLink
          to="/newMedicine"
          className="inline-flex items-center justify-center rounded-md bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 text-sm font-medium"
        >
          + Create
        </NavLink>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : medicines.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No medicines yet.</p>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="grid gap-3 md:hidden">
            {medicines.map((m) => (
              <div key={m.id} className="bg-white rounded-lg border shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={m.image || "/default-medicine.png"}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{m.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {m.dosage || "—"} · {m.category || "—"}
                    </p>
                  </div>
                  {m.below_reorder && (
                    <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                      Low
                    </span>
                  )}
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-gray-500">On hand</span>
                  <span className="font-medium">
                    {m.total_quantity} / reorder {m.reorder_level}
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <NavLink
                    to={`/medicines/${m.id}`}
                    className="flex-1 text-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 text-sm font-medium"
                  >
                    Detail
                  </NavLink>
                  <button
                    onClick={() => handleDelete(m.id)}
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
                  <th className="px-4 py-3 font-medium">Dosage</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Unit</th>
                  <th className="px-4 py-3 font-medium text-right">On hand</th>
                  <th className="px-4 py-3 font-medium text-right">Reorder at</th>
                  <th className="px-4 py-3 font-medium text-right">Batches</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {medicines.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={m.image || "/default-medicine.png"}
                          alt=""
                          className="w-8 h-8 rounded object-cover bg-gray-100 shrink-0"
                        />
                        <span className="font-medium truncate max-w-[14rem]">
                          {m.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{m.dosage || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{m.category || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{m.unit || "—"}</td>
                    <td className="px-4 py-3 text-right font-medium">{m.total_quantity}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{m.reorder_level}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{m.batches_count}</td>
                    <td className="px-4 py-3">
                      {m.below_reorder ? (
                        <span className="inline-block px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">
                          Low
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          OK
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <NavLink
                          to={`/medicines/${m.id}`}
                          className="rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 text-xs font-medium"
                        >
                          Detail
                        </NavLink>
                        <button
                          onClick={() => handleDelete(m.id)}
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

export default MedicineList;