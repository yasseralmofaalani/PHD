import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { restorationChartData } from '../../data/thesisData';

const RestorationChart: React.FC<{ height?: number }> = ({ height = 280 }) => {
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#fff',
          border: '1px solid rgba(66,129,119,0.3)',
          borderRadius: '8px',
          padding: '12px 16px',
          fontFamily: 'Inter',
          direction: 'ltr',
        }}>
          <p style={{ fontWeight: 700, color: '#000', fontSize: '14px' }}>{label}</p>
          <p style={{ color: '#428177', fontSize: '13px', marginTop: '4px' }}>
            أقصى زمن: <strong>&lt; {payload[0].value} دقائق</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={restorationChartData}
        margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="4 4" stroke="rgba(237,235,224,0.6)" vertical={false} />
        <XAxis
          dataKey="gen"
          tick={{ fontSize: 16, fill: '#000', fontWeight: 700, fontFamily: 'Inter' }}
          axisLine={{ stroke: 'rgba(0,0,0,0.15)' }}
          tickLine={false}
        />
        <YAxis
          domain={[0, 12]}
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.5)', fontFamily: 'Inter' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v} min`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="time" fill="#428177" radius={[8, 8, 0, 0]}>
          <LabelList
            dataKey="label"
            position="top"
            style={{ fontSize: '13px', fill: '#428177', fontWeight: 700, fontFamily: 'Cairo' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RestorationChart;
