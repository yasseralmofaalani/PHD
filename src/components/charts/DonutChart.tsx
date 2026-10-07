import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DonutChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  colors?: string[];
  centerLabel?: string;
  centerValue?: string;
}

const DEFAULT_COLORS = ['#428177', '#6b1f2a', 'rgba(66,129,119,0.5)'];

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  height = 280,
  innerRadius = 60,
  outerRadius = 100,
  colors = DEFAULT_COLORS,
  centerLabel,
  centerValue,
}) => {
  const CustomTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#fff',
          border: '1px solid rgba(66,129,119,0.3)',
          borderRadius: '8px',
          padding: '10px 14px',
          fontFamily: 'Cairo, sans-serif',
          fontSize: '13px',
        }}>
          <p style={{ fontWeight: 700, color: '#000' }}>{payload[0].name}</p>
          <p style={{ color: '#428177', marginTop: '4px' }}>{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={3}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontFamily: 'Cairo, Inter, sans-serif', fontSize: '13px' }}
          iconType="circle"
          iconSize={10}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
