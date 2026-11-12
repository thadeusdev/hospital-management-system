import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const WidgetSmall = ({ id }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("/doctors")
      .then((res) => res.json())
      .then((doctors) => setDoctors(doctors));
  }, []);

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold mb-4">
        Available Doctors
      </h3>

      <ul className="divide-y">
        {doctors.map((doctor) => (
          <li
            key={doctor.id}
            className="flex items-center gap-3 py-3"
          >
            <img
              src={doctor.image || "/default-avatar.png"}
              alt=""
              className="w-10 h-10 rounded-full object-cover bg-gray-200 shrink-0"
            />

            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{doctor.full_name}</p>
              <p className="text-sm text-gray-500 truncate">
                {doctor.primary_practice || "—"}
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-2.5 py-1.5
                         text-xs font-medium text-brand-700 hover:bg-brand-100
                         transition whitespace-nowrap"
            >
              <VisibilityIcon style={{ fontSize: 16 }} />
              Display
            </button>
          </li>
        ))}

        {doctors.length === 0 && (
          <li className="py-8 text-center text-sm text-gray-500">
            No doctors yet
          </li>
        )}
      </ul>
    </div>
  );
};

export default WidgetSmall;