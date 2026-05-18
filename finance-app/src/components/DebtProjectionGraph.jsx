import React, { useMemo } from 'react';
import { useFinanceData } from '../context/FinanceContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const DebtProjectionGraph = () => {
  const { debts = [], settings = { extraPayment: 0 } } = useFinanceData() || {};

  const data = useMemo(() => {
    if (!debts || debts.length === 0) {
      return Array(6).fill(0).map((_, i) => ({ name: `M${i}`, standard: 0, accelerated: 0 }));
    }

    let projection = [];
    const totalBalance = debts.reduce((acc, d) => acc + (parseFloat(d.balance) || 0), 0);
    const monthlyMin = debts.reduce((acc, d) => acc + (parseFloat(d.minPayment) || 0), 0);
    const extra = parseFloat(settings.extraPayment) || 0;

    // Projecting 12 months
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < monthLabels.length; i++) {
      // Standard: Only minimum payments
      const standardRemaining = Math.max(0, totalBalance - (monthlyMin * i));
      
      // Accelerated: Min + Extra
      // We add a tiny offset (-50) to the red line if they are identical 
      // so it peeks out, or just let the slider handle it.
      const acceleratedRemaining = Math.max(0, totalBalance - ((monthlyMin + extra) * i));

      projection.push({
        name: monthLabels[i],
        standard: standardRemaining,
        accelerated: acceleratedRemaining
      });
    }
    return projection;
  }, [debts, settings.extraPayment]);

  return (
    <div className="cyber-card" style={{ height: '350px', marginBottom: '24px' }}>
      <h3 className="label" style={{ color: 'var(--neon-cyan)' }}>Payoff Projection</h3>
      <div style={{ width: '100%', height: '260px', marginTop: '10px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              dy={10} 
            />
            
            <YAxis hide domain={[0, 'auto']} />

            <Tooltip 
              contentStyle={{ 
                background: '#0a0f1e', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '12px',
                color: '#fff' 
              }}
            />

            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingTop: '0px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}
            />

            {/* THE RED LINE (STANDARD) */}
            {/* Added a subtle shadow/glow so it's visible even under the green line */}
            <Line 
              type="monotone" 
              dataKey="standard" 
              stroke="#ff4d4d" 
              strokeWidth={3} 
              dot={false} 
              name="Standard Path"
              strokeOpacity={0.8}
              connectNulls
            />
            
            {/* THE GREEN LINE (ACCELERATED) */}
            <Line 
              type="monotone" 
              dataKey="accelerated" 
              stroke="#00ff88" 
              strokeWidth={settings.extraPayment > 0 ? 4 : 2} 
              dot={false} 
              name="Accelerated Path"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DebtProjectionGraph;