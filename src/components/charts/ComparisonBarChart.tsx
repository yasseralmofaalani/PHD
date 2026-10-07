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
  Cell,
} from 'recharts';

interface ComparisonBarChartProps {
  data: Array<{
    label: string;
    bpso: number;
    aga: number;
    unit?: string;
    min?: number;
    max?: number;
  }>;
  height?: number;
  showLegend?: boolean;
  domain?: [number, number];
}

const COLORS = {
  bpso: '#428177',
  aga: '#6b1f2a',
};

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; dataKey: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid rgba(66,129,119,0.3)',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        fontFamily: 'Inter, sans-serif',
        direction: 'ltr',
      }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', color: '#000', fontSize: '13px' }}>{label}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} style={{ color: entry.dataKey === 'bpso' ? COLORS.bpso : COLORS.aga, fontSize: '13px', margin: '3px 0' }}>
            {entry.name}: <strong>{entry.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ComparisonBarChart: React.FC<ComparisonBarChartProps> = ({
  data,
  height = 300,
  showLegend = true,
  domain,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          stroke="rgba(237,235,224,0.6)"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 13, fill: '#000', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}
          axisLine={{ stroke: 'rgba(0,0,0,0.15)' }}
          tickLine={false}
        />
        <YAxis
          domain={domain}
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.5)', fontFamily: 'Inter' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend
            wrapperStyle={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              paddingTop: '8px',
            }}
            formatter={(value) => value.toUpperCase()}
          />
        )}
        <Bar dataKey="bpso" name="BPSO" fill={COLORS.bpso} radius={[6, 6, 0, 0]} />
        <Bar dataKey="aga" name="AGA" fill={COLORS.aga} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComparisonBarChart;
