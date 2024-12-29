import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BillChart = ({ bills }) => {
  const chartData = bills.reduce((acc, bill) => {
    const date = new Date(bill.date);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[month]) {
      acc[month] = { month, total: 0 };
    }
    
    acc[month].total += parseFloat(bill.amount);
    return acc;
  }, {});

  const sortedData = Object.values(chartData).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={sortedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BillChart;

