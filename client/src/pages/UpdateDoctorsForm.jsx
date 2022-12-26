import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function UpdateDoctorsForm() {
    const [doctors, setDoctors] = useState([]);

    async function handleUpdate(doctorId, updates) {
      const response = await fetch(`/doctors/${doctorId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const updatedDoctor = await response.json();
  
      setDoctors(prevDoctors =>
        prevDoctors.map(doctor => (doctor.id === updatedDoctor.id ? updatedDoctor : doctor))
      );
    }

  return (
    <table>
      <tbody>
        {doctors.map(doctor => (
          <tr key={doctor.id}>
            <td>{doctor.full_name}</td>
            <td>
              <button onClick={() => handleUpdate(doctor.id, { name: 'Updated name' })}>
                Update
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UpdateDoctorsForm