import React, { useEffect, useState } from 'react'

function MedicinesTable() {
  const [medicines, setMedicines] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/medicines');
      const json = await response.json();
      setMedicines(json);
    }

    fetchData();
  }, []);

  if (!medicines) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {medicines.map(medicine => (
        <div key={medicine.id}>
          <h1>{medicine.name}</h1>
          {/* <p>{item.description}</p> */}
          <p>Related item ID: {medicine.patient_id}</p>
        </div>
      ))}
    </div>
  )
}

export default MedicinesTable