import React from 'react';
import { useFinanceData } from '../context/FinanceContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const StrategyComparison = () => {
  const { debts = [], settings = { extraPayment: 0 } } = useFinanceData();

  // Mock data for the visual - replace with your calculation logic
  const data = [
    { name: 'Snowball', interest: 45000 },
    { name: 'Avalanche', interest: 32000 },
  ];

  return (
    <div className="cyber-card" style={{ minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
      <h3 className="label" style={{ color: 'var(--neon-cyan)' }}>Strategy ROI</h3>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '10px 0' }}>
        <h2 style={{ margin: 0, color: 'var(--neon-green)' }}>Ksh 13,000</h2>
        <span style={{ fontSize: '10px', color: var(--text-muted) }}>EST. SAVINGS</span>
      </div>

      {/* FIXED: The container MUST have a height for ResponsiveContainer to work */}
      <div style={{ flex: 1, width: '100%', minHeight: '180px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Bar dataKey="interest" radius={[4, 4, 0, 0]} barSize={40}>
              <Cell fill="var(--neon-cyan)" />
              <Cell fill="var(--neon-green)" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StrategyComparison;