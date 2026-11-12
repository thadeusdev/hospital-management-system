import React, { useEffect, useState } from "react";

const WidgetLarge = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("/patients")
      .then((res) => res.json())
      .then((patients) => setPatients(patients));
  }, []);

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold mb-4">Recent Patients</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-2 pr-4 font-medium">Patient</th>
              <th className="py-2 pr-4 font-medium whitespace-nowrap">
                Visit Date
              </th>
              <th className="py-2 pr-4 font-medium whitespace-nowrap">
                Visit Number
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={patient.image || "/default-avatar.png"}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover bg-gray-200 shrink-0"
                    />
                    <span className="font-medium truncate max-w-[10rem]">
                      {patient.full_name}
                    </span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">
                  {patient.visiting_date}
                </td>
                <td className="py-3 pr-4 text-gray-600">{patient.visit_no}</td>
              </tr>
            ))}

            {patients.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="py-8 text-center text-sm text-gray-500"
                >
                  No patients yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WidgetLarge;
