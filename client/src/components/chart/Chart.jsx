import React from 'react'
import "./chart.css"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = () => {
    const data = [
        {
          name: 'Jan',
          "Active User": 4000,
        },
        {
          name: 'Feb',
          "Active User": 3000,
        },
        {
          name: 'Mar',
          "Active User": 2000,
        },
        {
          name: 'Apr',
          "Active User": 2780,
        },
        {
          name: 'May',
          "Active User": 1890,
        },
        {
          name: 'June',
          "Active User": 2390,
        },
        {
          name: 'Jul',
          "Active User": 3490,
        },
      ];

  return (
    <div className='chart'>
        <h3 className="chartTitle">User Analytics</h3>
        <ResponsiveContainer aspect={4 / 1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke='#5550bd' />
                <Line type="monotone" dataKey="Active User" stroke='#5550bd' />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Chart