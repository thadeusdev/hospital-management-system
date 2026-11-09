import React, { useState, useEffect } from 'react'
import "./chart.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = () => {
    const [diagnostics, setDiagnostics] = useState([]);

    useEffect(() => {
      fetch('/diagnostics')
      .then(res => res.json())
      .then(diagnostics => setDiagnostics(diagnostics))
    }, []);

  return (
    <div className='chart'>
        <h3 className="chartTitle">Patient Analytics</h3>
        <ResponsiveContainer aspect={4 / 1}>
            <LineChart data={diagnostics}>
                <XAxis dataKey="name" stroke='#5550bd' />
                <YAxis stroke='#5550bd' />
                <Line type="monotone" dataKey="sugar" stroke='#5550bd' />
                <Line type="monotone" dataKey="pressure" stroke='#5550bd' />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Chart