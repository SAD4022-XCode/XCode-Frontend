import React from 'react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EventChart = ({paidOnline,paidInperson,freeOnline,freeInperson }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateChartData = () => {
      const chartData = [
        { name: 'حضوری', paid: paidInperson, free: freeInperson },
        { name: 'آنلاین', paid: paidOnline, free: freeOnline }
      ];
      setData(chartData);
    };

    generateChartData();
  }, []);
  const COLORS = ['#0575BA','#F01993', ];

  return (
    <ResponsiveContainer> 
      <BarChart
        data={data}
        
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"  tick={{ fill: '#F8C920' }} />
        <YAxis tick={{ fill: '#f9d966' }} />
        {/* <Tooltip /> */}
        <Legend direction="rtl"  wrapperStyle={{ direction: 'rtl' ,marginLeft:"20px"}} 
          payload={[
            { value: ' رایگان', type: 'square', color: COLORS[0] },
            { value: ' پولی', type: 'square', color: COLORS[1] }
          ]}
        />
        <Bar dataKey="free" fill="#F01993" />
        <Bar dataKey="paid" fill="#0575BA" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default EventChart;

