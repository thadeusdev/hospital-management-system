import React, { useEffect, useState } from "react";

export default function Alerts() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/alerts")
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(setData)
      .catch(() => setError("Unable to load alerts"));
  }, []);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return <p className="text-sm text-gray-500">Loading…</p>;

  const Section = ({ title, count, children }) => (
    <section className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
      <h2 className="font-semibold mb-3 flex items-center gap-2">
        {title}
        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
          {count}
        </span>
      </h2>
      {count === 0 ? (
        <p className="text-sm text-gray-500">None</p>
      ) : (
        children
      )}
    </section>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-4">
      <h1 className="text-xl md:text-2xl font-bold mb-2">Alerts</h1>

      <Section title="Low stock" count={data.low_stock.length}>
        <ul className="divide-y">
          {data.low_stock.map((m) => (
            <li key={m.id} className="py-2 flex justify-between text-sm">
              <span className="font-medium">{m.name}</span>
              <span className="text-red-600">
                {m.total_quantity} / reorder {m.reorder_level}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Expiring within 90 days" count={data.expiring_soon.length}>
        <ul className="divide-y">
          {data.expiring_soon.map((b) => (
            <li key={b.id} className="py-2 flex justify-between text-sm">
              <span className="font-medium truncate">
                {b.medicine}{" "}
                <span className="text-gray-500">· {b.batch_number}</span>
              </span>
              <span className="text-yellow-600 whitespace-nowrap">
                {b.days_to_expiry}d
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Expired" count={data.expired.length}>
        <ul className="divide-y">
          {data.expired.map((b) => (
            <li key={b.id} className="py-2 flex justify-between text-sm">
              <span className="font-medium truncate">
                {b.medicine} · {b.batch_number}
              </span>
              <span className="text-red-600 whitespace-nowrap">
                Expired {b.expiry_date}
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}