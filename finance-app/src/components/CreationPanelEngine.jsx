import React, { useState } from 'react';
import { useFinanceData } from '../context/FinanceContext';

const CreationPanelEngine = () => {
  const { addDebt, addSavingsGoal } = useFinanceData() || {};
  const [activeForm, setActiveForm] = useState(null); // 'debt' or 'savings'

  // Debt Form States
  const [debtName, setDebtName] = useState('');
  const [debtBalance, setDebtBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [minPayment, setMinPayment] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [debtType, setDebtType] = useState('M-Shwari');

  // Savings Form States
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyGoal, setMonthlyGoal] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const handleDebtSubmit = (e) => {
    e.preventDefault();
    if (!debtName || !debtBalance) return;

    if (addDebt) {
      addDebt({
        name: debtName,
        balance: parseFloat(debtBalance) || 0,
        interestRate: parseFloat(interestRate) || 0,
        minimumPayment: parseFloat(minPayment) || 0,
        dueDate: dueDate || '28th of Month',
        type: debtType
      });
    }

    // Reset Form Fields
    setDebtName('');
    setDebtBalance('');
    setInterestRate('');
    setMinPayment('');
    setDueDate('');
    setActiveForm(null);
  };

  const handleSavingsSubmit = (e) => {
    e.preventDefault();
    if (!goalName || !targetAmount) return;

    if (addSavingsGoal) {
      addSavingsGoal({
        name: goalName,
        targetAmount: parseFloat(targetAmount) || 0,
        monthlyContribution: parseFloat(monthlyGoal) || 0,
        targetDate: targetDate || 'Dec 2026',
        icon: '🛡️'
      });
    }

    // Reset Form Fields
    setGoalName('');
    setTargetAmount('');
    setMonthlyGoal('');
    setTargetDate('');
    setActiveForm(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* TRIGGER WORKFLOW BUTTONS BAR */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={() => setActiveForm(activeForm === 'debt' ? null : 'debt')}
          style={{
            flex: 1, padding: '14px', borderRadius: '8px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px', transition: 'all 0.2s ease',
            background: activeForm === 'debt' ? '#E74C3C' : 'rgba(231, 76, 60, 0.1)',
            color: activeForm === 'debt' ? '#000' : '#E74C3C',
            border: '1px solid rgba(231, 76, 60, 0.2)'
          }}
        >
          ⚠️ {activeForm === 'debt' ? 'CANCEL SELECTION' : 'LOG NEW LIABILITY'}
        </button>
        <button
          onClick={() => setActiveForm(activeForm === 'savings' ? null : 'savings')}
          style={{
            flex: 1, padding: '14px', borderRadius: '8px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px', transition: 'all 0.2s ease',
            background: activeForm === 'savings' ? 'var(--neon-green, #00ffa0)' : 'rgba(0, 255, 160, 0.1)',
            color: activeForm === 'savings' ? '#000' : 'var(--neon-green, #00ffa0)',
            border: '1px solid rgba(0, 255, 160, 0.2)'
          }}
        >
          🛡️ {activeForm === 'savings' ? 'CANCEL SELECTION' : 'DEFINE SAVINGS GOAL'}
        </button>
      </div>

      {/* DYNAMIC FORM DRAWER INJECTIONS */}
      {activeForm === 'debt' && (
        <form onSubmit={handleDebtSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(231, 76, 60, 0.15)' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '700' }}>DEBT / CREDITOR NAME</label>
            <input type="text" placeholder="e.g., Equity Bank Super Loan" required style={{ width: '100%', padding: '10px', background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} value={debtName} onChange={(e) => setDebtName(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '700' }}>PRINCIPAL OUTSTANDING (KES)</label>
            <input type="number" placeholder="e.g., 300000" required style={{ width: '100%', padding: '10px', background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} value={debtBalance} onChange={(e) => setDebtBalance(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '700' }}>ANNUAL INTEREST RATE (%)</label>
            <input type="number" step="0.1" placeholder="e.g., 12.8" required style={{ width: '100%', padding: '10px', background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '700' }}>MINIMUM MONTHLY PAYMENT (KES)</label>
            <input type="number" placeholder="e.g., 7250" required style={{ width: '100%', padding: '10px', background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} value={minPayment} onChange={(e) => setMinPayment(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '700' }}>MONTHLY DUE DATE TIMELINE</label>
            <input type="text" placeholder="e.g., 28th of Month" style={{ width: '100%', padding: '10px', background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#E74C3C', border: 'none', borderRadius: '6px', color: '#000', fontWeight: '800', cursor: 'pointer' }}>INITIALIZE LIABILITIES BLUEPRINT</button>
          </div>
        </form>
      )}

      {activeForm === 'savings' && (
        <form onSubmit={handleSavingsSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(0, 255, 160, 0.15)' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '700' }}>ACCUMULATION TARGET NODE NAME</label>
            <input type="text" placeholder="e.g., Emergency Reserve Vault" required style={{ width: '100%', padding: '10px', background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} value={goalName} onChange={(e) => setGoalName(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '700' }}>TARGET GOAL AMOUNT (KES)</label>
            <input type="number" placeholder="e.g., 300000" required style={{ width: '100%', padding: '10px', background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '700' }}>MONTHLY ALLOCATION CONTRIBUTION (KES)</label>
            <input type="number" placeholder="e.g., 15000" style={{ width: '100%', padding: '10px', background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} value={monthlyGoal} onChange={(e) => setMonthlyGoal(e.target.value)} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '700' }}>TARGET DATE HORIZON</label>
            <input type="text" placeholder="e.g., December 2026" style={{ width: '100%', padding: '10px', background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
          </div>
          <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            <button type="submit" style={{ width: '100%', padding: '12px', background: 'var(--neon-green, #00ffa0)', border: 'none', borderRadius: '6px', color: '#000', fontWeight: '800', cursor: 'pointer' }}>ENGAGE ACCUMULATION MATRIX</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreationPanelEngine;