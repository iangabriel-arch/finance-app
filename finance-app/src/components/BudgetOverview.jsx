import React from 'react';
import { useFinanceData } from '../context/FinanceContext';

const BudgetOverview = () => {
  const { totalSpent = 0, remainingBudget = 120000, settings = {} } = useFinanceData() || {};
  const limit = settings.monthlyBudget || 120000;
  
  const percentageUsed = Math.min(100, (totalSpent / limit) * 100);
  const isOverextended = remainingBudget < 0;

  return (
    <div className="consumer-card" style={{ borderLeft: isOverextended ? '4px solid var(--neon-red)' : '4px solid var(--neon-green)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span className="label" style={{ color: isOverextended ? 'var(--neon-red)' : 'var(--neon-green)' }}>
            {isOverextended ? 'System Overdraft' : 'Safe Operating Runway'}
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: '700', margin: '4px 0' }}>
            Ksh {Math.abs(remainingBudget).toLocaleString()}
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {isOverextended ? 'deficit outstanding' : 'available until reset'}
          </span>
        </div>
      </div>

      {/* METRIC PERFORMANCE FILL TANK */}
      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', marginTop: '20px', overflow: 'hidden' }}>
        <div style={{ 
          width: `${percentageUsed}%`, 
          height: '100%', 
          background: isOverextended ? 'var(--neon-red)' : 'linear-gradient(90deg, var(--neon-green), var(--neon-cyan))',
          boxShadow: `0 0 10px ${isOverextended ? 'var(--neon-red)' : 'var(--neon-cyan)'}`
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '12px', color: 'var(--text-muted)' }}>
        <span>Burned: Ksh {totalSpent.toLocaleString()}</span>
        <span>Allocated: Ksh {limit.toLocaleString()}</span>
      </div>

      {/* ACTIVE ADVISORY INSIGHT BLOCK */}
      <div style={{ marginTop: '20px', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', fontSize: '12px', color: isOverextended ? 'var(--neon-red)' : 'var(--text-main)' }}>
        {isOverextended 
          ? '🛑 High Volatility Detected: Immediate consumption halt recommended to preserve optimization capacity.'
          : '💡 Velocity Insight: You spent 14% less than last week. Reallocate savings to the Payment Accelerator!'}
      </div>
    </div>
  );
};

export default BudgetOverview;