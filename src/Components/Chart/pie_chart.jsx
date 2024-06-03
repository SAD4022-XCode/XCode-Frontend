import React from 'react';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DoghnutChart = ({ value1, value2, legendText }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const calculatePercentage = (total, value) => {
      return ((value / total) * 100).toFixed(0);
    };

    const generateChartData = () => {
      const totalValue = value1 + value2;
      const percentage1 = calculatePercentage(totalValue, value1);
      const percentage2 = calculatePercentage(totalValue, value2);

      const chartData = [
        { name: 'حضوری', value: parseFloat(percentage1) },
        { name: 'آنلاین', value: parseFloat(percentage2) }
      ];
      setData(chartData);
    };

    generateChartData();
  }, [value1, value2]);

  const COLORS = ['#4EFB9F96', '#ff9800'];

  return (
    <ResponsiveContainer >
      <PieChart>
        <Pie

          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60} // تنظیم اندازه داخلی دونات
          outerRadius={100}
          fill="#B34CF7"
          label
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        {/* <Tooltip 
        wrapperStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#000', borderRadius: '5px', border: '1px solid #ccc', padding: '5px' }}
        contentStyle={{ fontSize: '14px' }}
        formatter={(value, name, props) => {
          return (
            <div>
              <p>{`${value} تعداد ${name}`}</p>
            </div>
          );
        }}
        /> */}
        <Legend direction="rtl"  wrapperStyle={{ direction: 'rtl' }} 
          payload={[
            { value: ' حضوری', type: 'square', color: COLORS[0] },
            { value: ' آنلاین', type: 'square', color: COLORS[1] }
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default DoghnutChart;




































