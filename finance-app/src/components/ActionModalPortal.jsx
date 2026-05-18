import React, { useState, useEffect } from 'react';
import { useFinanceData } from '../context/FinanceContext';

const ActionModalPortal = ({ isOpen, onClose, defaultType = 'debt', selectedGoalId = null }) => {
  const { addDebt, addSavingsGoal, topUpSavingsGoal, goals = [] } = useFinanceData() || {};
  const [activeTab, setActiveTab] = useState(defaultType);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultType);
    }
  }, [isOpen, defaultType]);

  // Standardized Form States
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [rate, setRate] = useState('');
  const [minPayment, setMinPayment] = useState('');
  const [targetDate, setTargetDate] = useState('');
  
  // Top-Up State
  const [topUpAmount, setTopUpAmount] = useState('');

  if (!isOpen) return null;

  const activeGoal = goals.find(g => g.id === selectedGoalId);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ROUTE A: Handle Contextual Top Ups
    if (activeTab === 'topup') {
      if (!topUpAmount || !selectedGoalId) return;

      if (topUpSavingsGoal) {
        topUpSavingsGoal(selectedGoalId, parseFloat(topUpAmount));
      } else {
        // Fallback directly to mutation layer if pipeline hook mismatch occurs
        if (activeGoal) {
          activeGoal.currentAmount = (parseFloat(activeGoal.currentAmount) || 0) + parseFloat(topUpAmount);
        }
      }

      setTopUpAmount('');
      onClose();
      return;
    }

    // ROUTE B: Handle Standard Form Component Creation
    if (!name || !balance) return;

    if (activeTab === 'debt' && addDebt) {
      addDebt({
        name,
        balance: parseFloat(balance),
        interestRate: parseFloat(rate) || 0,
        minimumPayment: parseFloat(minPayment) || 0,
        dueDate: targetDate || '28th of Month',
        type: 'Liability Burden'
      });
    } else if (activeTab === 'savings' && addSavingsGoal) {
      addSavingsGoal({
        name,
        targetAmount: parseFloat(balance),
        currentAmount: 0,
        monthlyContribution: parseFloat(minPayment) || 0,
        targetDate: targetDate || 'Dec 2026',
        icon: '🛡️'
      });
    }

    setName('');
    setBalance('');
    setRate('');
    setMinPayment('');
    setTargetDate('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(3, 5, 11, 0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{
        background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px', width: '480px', padding: '24px', boxSizing: 'border-box',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
      }}>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', alignItems: 'center' }}>
          {activeTab === 'topup' ? (
            <span style={{ color: 'var(--neon-green, #00ffa0)', fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>
              ⚡ CAPITAL TOP-UP INTERCEPT PROTOCOL
            </span>
          ) : (
            <>
              <button 
                type="button" onClick={() => setActiveTab('debt')}
                style={{ background: 'transparent', border: 'none', color: activeTab === 'debt' ? '#E74C3C' : '#64748b', fontSize: '12px', fontWeight: '800', cursor: 'pointer', paddingBottom: '4px', borderBottom: activeTab === 'debt' ? '2px solid #E74C3C' : 'none' }}
              >
                ⚠️ INITIALIZE DEBT
              </button>
              <button 
                type="button" onClick={() => setActiveTab('savings')}
                style={{ background: 'transparent', border: 'none', color: activeTab === 'savings' ? 'var(--neon-green, #00ffa0)' : '#64748b', fontSize: '12px', fontWeight: '800', cursor: 'pointer', paddingBottom: '4px', borderBottom: activeTab === 'savings' ? '2px solid var(--neon-green, #00ffa0)' : 'none' }}
              >
                🛡️ CREATE RESERVE GOAL
              </button>
            </>
          )}
          <button type="button" onClick={onClose} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#64748b', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {activeTab === 'topup' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '10px', color: '#64748b', display: 'block', fontWeight: '700' }}>TARGET CAPITAL VAULT</span>
                <strong style={{ color: '#fff', fontSize: '15px' }}>{activeGoal?.icon || '🛡️'} {activeGoal?.name || 'Asset Reserve'}</strong>
                <div style={{ color: 'var(--neon-green, #00ffa0)', fontSize: '12px', marginTop: '4px', fontWeight: '700' }}>
                  Current Standing: KES {(activeGoal?.currentAmount || 0).toLocaleString()} / KES {(activeGoal?.targetAmount || 0).toLocaleString()}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px', fontWeight: '700' }}>INCREMENTAL TOP-UP CAPITAL AMOUNT (KES)</label>
                <input 
                  type="number" required autoFocus placeholder="e.g., 5000"
                  style={{ width: '100%', padding: '14px', background: '#050813', border: '1px solid var(--neon-green, #00ffa0)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box', fontSize: '16px', fontFamily: 'Space Grotesk' }}
                  value={topUpAmount} onChange={(e) => setTopUpAmount(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px', fontWeight: '700' }}>
                  {activeTab === 'debt' ? 'CREDITOR OR LIABILITY NAME' : 'SAVINGS / EMERGENCY FUND NAME'}
                </label>
                <input 
                  type="text" required placeholder={activeTab === 'debt' ? "e.g., M-Shwari Balance" : "e.g., 3-Month Emergency Vault"}
                  style={{ width: '100%', padding: '12px', background: '#050813', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
                  value={name} onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px', fontWeight: '700' }}>
                    {activeTab === 'debt' ? 'TOTAL OUTSTANDING (KES)' : 'TARGET RESERVE CAPITAL (KES)'}
                  </label>
                  <input 
                    type="number" required placeholder="e.g., 25000"
                    style={{ width: '100%', padding: '12px', background: '#050813', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
                    value={balance} onChange={(e) => setBalance(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px', fontWeight: '700' }}>
                    {activeTab === 'debt' ? 'INTEREST RATE (%)' : 'MONTHLY CONTRIBUTION (KES)'}
                  </label>
                  <input 
                    type="number" step="0.1" placeholder={activeTab === 'debt' ? "e.g., 12.5" : "e.g., 5000"}
                    style={{ width: '100%', padding: '12px', background: '#050813', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
                    value={rate} onChange={(e) => setRate(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px', fontWeight: '700' }}>
                    {activeTab === 'debt' ? 'MINIMUM MONTHLY PAY' : 'TARGET HORIZON CALENDAR'}
                  </label>
                  <input 
                    type="text" placeholder={activeTab === 'debt' ? "e.g., 1500" : "e.g., Dec 2026"}
                    style={{ width: '100%', padding: '12px', background: '#050813', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
                    value={minPayment} onChange={(e) => setMinPayment(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px', fontWeight: '700' }}>
                    {activeTab === 'debt' ? 'MONTHLY DUE TIMELINE' : 'ICON SELECTOR'}
                  </label>
                  <input 
                    type="text" placeholder={activeTab === 'debt' ? "e.g., 28th of Month" : "🎯"}
                    style={{ width: '100%', padding: '12px', background: '#050813', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
                    value={targetDate} onChange={(e) => setTargetDate(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <button 
            type="submit" 
            style={{
              width: '100%', padding: '14px', borderRadius: '6px', border: 'none', fontWeight: '800', cursor: 'pointer', marginTop: '12px',
              background: activeTab === 'debt' ? '#E74C3C' : 'var(--neon-green, #00ffa0)', color: '#000'
            }}
          >
            {activeTab === 'topup' ? 'EXECUTE FUND DEPOSIT PROTOCOL' : activeTab === 'debt' ? 'COMMIT LIABILITY TO PIPELINE' : 'ENGAGE RESERVE TARGET'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActionModalPortal;