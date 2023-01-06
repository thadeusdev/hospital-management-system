import React from 'react'
import "./chart.css"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = () => {
    const data = [
        {
          name: 'Jan',
          "Patients": 4000,
        },
        {
          name: 'Feb',
          "Patients": 3000,
        },
        {
          name: 'Mar',
          "Patients": 2000,
        },
        {
          name: 'Apr',
          "Patients": 2780,
        },
        {
          name: 'May',
          "Patients": 1890,
        },
        {
          name: 'June',
          "Patients": 2390,
        },
        {
          name: 'Jul',
          "Patients": 3490,
        },
        {
          name: 'Aug',
          "Patients": 3040,
        },
        {
          name: 'Sep',
          "Patients": 2490,
        },
        {
          name: 'Oct',
          "Patients": 2000,
        },
        {
          name: 'Nov',
          "Patients": 3490,
        },
        {
          name: 'Dec',
          "Patients": 1780,
        },
      ];

  return (
    <div className='chart'>
        <h3 className="chartTitle">Patient Analytics</h3>
        <ResponsiveContainer aspect={4 / 1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke='#5550bd' />
                <Line type="monotone" dataKey="Patients" stroke='#5550bd' />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Chart