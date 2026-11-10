import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import VerifiedIcon from "@mui/icons-material/Verified";

const initial = {
  image: "",
  name: "",
  dosage: "",
  description: "",
  category: "",
  reorder_level: 10,
  unit: "tablet",
  is_acidic: false,
  infant_safe: false,
};

const Medicine = () => {
  const [singleMedicine, setSingleMedicine] = useState(initial);
  const [saved, setSaved] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/medicines/${id}`)
      .then((r) => r.json())
      .then((m) => setSingleMedicine({ ...initial, ...m }))
      .catch(() => setSingleMedicine(initial));
  }, [id]);

  const handleEdit = (e) => {
    const { name, value, type } = e.target;
    setSaved(false);
    setSingleMedicine({
      ...singleMedicine,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      name: singleMedicine.name,
      dosage: singleMedicine.dosage,
      description: singleMedicine.description,
      category: singleMedicine.category,
      image: singleMedicine.image,
      reorder_level: Number(singleMedicine.reorder_level),
      unit: singleMedicine.unit,
      is_acidic: singleMedicine.is_acidic,
      infant_safe: singleMedicine.infant_safe,
    };

    fetch(`/medicines/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(() => setSaved(true))
      .catch(() => setSaved(false));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Edit medicine</h1>
        <NavLink
          to="/newMedicine"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: read-only summary */}
        <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
          <div className="flex items-center gap-4 pb-4 border-b">
            <img
              src={singleMedicine.image || "/default-medicine.png"}
              alt=""
              className="w-16 h-16 rounded-lg object-cover bg-gray-100"
            />
            <div className="min-w-0">
              <p className="font-semibold text-lg truncate">
                {singleMedicine.name || "—"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {singleMedicine.dosage || "—"}
              </p>
            </div>
          </div>

          <dl className="mt-4 space-y-3 text-sm">
            <Row label="Description" value={singleMedicine.description} icon={<CoronavirusIcon fontSize="small" />} />
            <Row label="Category"    value={singleMedicine.category}    icon={<VerifiedIcon fontSize="small" />} />
            <Row label="Unit"        value={singleMedicine.unit}        icon={<VerifiedIcon fontSize="small" />} />
            <Row
              label="Reorder at"
              value={singleMedicine.reorder_level}
              icon={<VerifiedIcon fontSize="small" />}
            />
            <Row
              label="Total on hand"
              value={
                <>
                  <span className="font-medium">{singleMedicine.total_quantity ?? 0}</span>
                  {singleMedicine.below_reorder && (
                    <span className="ml-2 inline-block px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
                      Low
                    </span>
                  )}
                </>
              }
            />
            <Row
              label="Batches"
              value={singleMedicine.batches?.length ?? 0}
              icon={<VerifiedIcon fontSize="small" />}
            />
            <Row label="Acidic"      value={String(singleMedicine.is_acidic)} icon={<VerifiedIcon fontSize="small" />} />
            <Row label="Infant safe" value={String(singleMedicine.infant_safe)} icon={<VerifiedIcon fontSize="small" />} />
          </dl>
        </div>

        {/* Right: edit form */}
        <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
          <h2 className="font-semibold mb-4">Edit</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name">
                <input
                  type="text" name="name" value={singleMedicine.name}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Dosage">
                <input
                  type="text" name="dosage" value={singleMedicine.dosage}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Category">
                <input
                  type="text" name="category" value={singleMedicine.category}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Unit">
                <input
                  type="text" name="unit" value={singleMedicine.unit}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Reorder level">
                <input
                  type="number" min="0" name="reorder_level"
                  value={singleMedicine.reorder_level}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Image URL">
                <input
                  type="text" name="image" value={singleMedicine.image}
                  onChange={handleEdit}
                  className={inputCls}
                />
              </Field>
              <Field label="Acidic?">
                <select name="is_acidic" value={String(singleMedicine.is_acidic)} onChange={handleEdit} className={inputCls}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </Field>
              <Field label="Infant safe?">
                <select name="infant_safe" value={String(singleMedicine.infant_safe)} onChange={handleEdit} className={inputCls}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </Field>
            </div>

            <Field label="Description">
              <textarea
                name="description" rows="3" value={singleMedicine.description}
                onChange={handleEdit}
                className={inputCls}
              />
            </Field>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
              <NavLink
                to="/medicines"
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
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

const Field = ({ label, children }) => (
  <label className="block">
    <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
    {children}
  </label>
);

const Row = ({ label, value, icon }) => (
  <div className="flex items-start gap-2">
    {icon && <span className="text-gray-400 mt-0.5 shrink-0">{icon}</span>}
    <div className="min-w-0">
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-800 break-words">{value ?? "—"}</dd>
    </div>
  </div>
);

export default Medicine;