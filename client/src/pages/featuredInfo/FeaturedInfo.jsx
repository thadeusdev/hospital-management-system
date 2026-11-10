import React, { useEffect, useState } from "react";

const FeaturedInfo = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/stats")
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(setStats)
      .catch(() => setError("Unable to load statistics"));
  }, []);

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }
  if (!stats) {
    return <p className="text-sm text-gray-500">Loading…</p>;
  }

  const cards = [
    { label: "Doctors",     value: stats.counts.doctors },
    { label: "Patients",    value: stats.counts.patients },
    { label: "Medicines",   value: stats.counts.medicines },
    { label: "Appointments", value: stats.counts.appointments },
    { label: "Prescriptions", value: stats.counts.prescriptions },
    {
      label: "Low stock",
      value: stats.stock.low_stock,
      hint: "Medicines below reorder level",
      danger: true,
    },
    {
      label: "Expiring soon",
      value: stats.stock.expiring_90d,
      hint: "Batches within 90 days",
      warning: true,
    },
    {
      label: "Expired",
      value: stats.stock.expired,
      hint: "Batches past expiry",
      danger: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
          <p className="text-sm text-gray-500">{c.label}</p>
          <p
            className={`text-2xl md:text-3xl font-bold mt-1 ${
              c.danger && c.value > 0
                ? "text-red-600"
                : c.warning && c.value > 0
                ? "text-yellow-600"
                : ""
            }`}
          >
            {c.value}
          </p>
          {c.hint && <p className="text-xs text-gray-400 mt-1">{c.hint}</p>}
        </div>
      ))}
    </div>
  );
};

export default FeaturedInfo;