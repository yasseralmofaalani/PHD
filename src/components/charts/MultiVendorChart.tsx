import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { multiVendorChartData } from '../../data/thesisData';

interface MultiVendorChartProps {
  height?: number;
}

const MultiVendorChart: React.FC<MultiVendorChartProps> = ({ height = 320 }) => {
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number; name: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#fff',
          border: '1px solid rgba(66,129,119,0.3)',
          borderRadius: '8px',
          padding: '12px 16px',
          fontFamily: 'Inter, sans-serif',
          direction: 'ltr',
        }}>
          <p style={{ fontWeight: 700, marginBottom: '8px', color: '#000', fontSize: '13px' }}>{label}</p>
          {payload.map((entry) => (
            <p key={entry.name} style={{
              color: entry.name === 'Huawei' ? '#428177' : '#6b1f2a',
              fontSize: '13px',
              margin: '3px 0'
            }}>
              {entry.name}: <strong>{entry.value}%</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={multiVendorChartData}
        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <CartesianGrid strokeDasharray="4 4" stroke="rgba(237,235,224,0.6)" vertical={false} />
        <XAxis
          dataKey="metricShort"
          tick={{ fontSize: 12, fill: '#000', fontFamily: 'Inter', fontWeight: 600 }}
          axisLine={{ stroke: 'rgba(0,0,0,0.15)' }}
          tickLine={false}
        />
        <YAxis
          domain={[88, 100]}
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.5)', fontFamily: 'Inter' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontFamily: 'Inter', fontSize: '13px', paddingTop: '8px' }} />
        <ReferenceLine y={95} stroke="rgba(107,31,42,0.3)" strokeDasharray="4 2" />
        <Bar dataKey="huawei" name="Huawei" fill="#428177" radius={[6, 6, 0, 0]} />
        <Bar dataKey="ericsson" name="Ericsson" fill="#6b1f2a" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MultiVendorChart;
