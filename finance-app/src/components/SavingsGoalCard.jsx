import React from 'react';
import { useFinanceData } from '../context/FinanceContext';

const SavingsGoalCard = ({ goal }) => {
  const { fundSavingsGoal, deleteGoal } = useFinanceData() || {};

  if (!goal) return null;

  const current = parseFloat(goal.currentAmount) || 0;
  const target = parseFloat(goal.targetAmount) || 1;
  const percentage = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className="consumer-card" style={{ position: 'relative', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', width: '100%', boxSizing: 'border-box' }}>
      
      <button 
        onClick={() => deleteGoal && deleteGoal(goal.id)}
        style={{ position: 'absolute', top: '12px', right: '16px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.2)', fontSize: '18px', cursor: 'pointer' }}
      >
        ×
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '20px' }}>{goal.icon || '🎯'}</span>
          <h3 style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#fff' }}>{goal.name}</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target Horizon: {goal.targetDate}</span>
        </div>
        
        {/* Progress Ring Visual Mockup */}
        <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '50%', background: `conic-gradient(var(--neon-green, #00ffa0) ${percentage}%, rgba(255,255,255,0.05) 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: '#fff' }}>
            {percentage}%
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '12px' }}>
        <div>
          <div style={{ color: 'var(--text-muted)' }}>SAVED</div>
          <div style={{ color: 'var(--neon-green, #00ffa0)', fontWeight: '800' }}>KES {current.toLocaleString()}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'var(--text-muted)' }}>TARGET</div>
          <div style={{ color: '#fff', fontWeight: '800' }}>KES {target.toLocaleString()}</div>
        </div>
      </div>

      <button 
        onClick={() => fundSavingsGoal && fundSavingsGoal(goal.id, 5000)}
        style={{ width: '100%', marginTop: '14px', background: 'rgba(0, 255, 160, 0.1)', border: '1px solid rgba(0, 255, 160, 0.2)', color: 'var(--neon-green, #00ffa0)', padding: '8px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}
      >
        + Top Up KES 5,000
      </button>
    </div>
  );
};

export default SavingsGoalCard;