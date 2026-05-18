import React, { useState } from 'react';
import { useFinanceData } from '../context/FinanceContext';

// NOTE: If your file was named "Strategies", you can change this name to "const Strategies = () => {"
const DebtPayoffStrategies = () => {
  // Pulling your real logged M-Shwari and Shylock data directly from your context stream
  const { debts = [] } = useFinanceData() || {};
  
  // This state monitors whether SNOWBALL or AVALANCHE is selected
  const [strategyMode, setStrategyMode] = useState('AVALANCHE'); 

  // The math engine that re-sorts your real debts when you click a button
  const getProcessedStack = () => {
    if (!debts || debts.length === 0) return [];

    if (strategyMode === 'SNOWBALL') {
      // Snowball: Sorts your real debts by Lowest Balance first
      return [...debts].sort((a, b) => (parseFloat(a.balance) || 0) - (parseFloat(b.balance) || 0));
    } else {
      // Avalanche: Sorts your real debts by Highest Interest Rate first
      return [...debts].sort((a, b) => (parseFloat(b.interestRate) || 0) - (parseFloat(a.interestRate) || 0));
    }
  };

  const prioritizedDebts = getProcessedStack();
  const totalManagedExposure = debts.reduce((sum, d) => sum + (parseFloat(d.balance) || 0), 0);
  const baselineCommitment = debts.reduce((sum, d) => sum + (parseFloat(d.minimumPayment || d.minPayment || 0)), 0);

  const estimatedFreedomMonths = totalManagedExposure > 0 && baselineCommitment > 0 
    ? Math.ceil(totalManagedExposure / baselineCommitment) 
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      
      {/* OPTIMIZATION HEADER CONSOLE */}
      <div style={{ background: 'rgba(11, 19, 43, 0.4)', padding: '20px', borderRadius: '12px' }}>
        <span style={{ fontSize: '11px', color: 'var(--neon-cyan, #00f0ff)', fontWeight: '800', letterSpacing: '0.5px' }}>OPTIMIZATION CONSOLE</span>
        <h2 style={{ margin: '2px 0 0 0', fontSize: '22px', fontWeight: '800', color: '#fff', fontFamily: 'Space Grotesk' }}>Debt Payoff Strategies</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: ACTIVE BLUEPRINT SELECTOR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'rgba(11, 19, 43, 0.4)', padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700' }}>ACTIVE OPTIMIZATION BLUEPRINT</span>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button 
                type="button"
                onClick={() => setStrategyMode('SNOWBALL')}
                style={{
                  background: strategyMode === 'SNOWBALL' ? 'rgba(0, 240, 255, 0.12)' : 'rgba(5, 9, 20, 0.4)',
                  border: strategyMode === 'SNOWBALL' ? '1px solid var(--neon-cyan, #00f0ff)' : '1px solid rgba(255,255,255,0.05)',
                  color: strategyMode === 'SNOWBALL' ? 'var(--neon-cyan, #00f0ff)' : '#64748b',
                  padding: '12px', borderRadius: '6px', fontWeight: '800', fontSize: '11px', cursor: 'pointer', letterSpacing: '0.5px'
                }}
              >
                SNOWBALL
              </button>

              <button 
                type="button"
                onClick={() => setStrategyMode('AVALANCHE')}
                style={{
                  background: strategyMode === 'AVALANCHE' ? 'rgba(0, 240, 255, 0.12)' : 'rgba(5, 9, 20, 0.4)',
                  border: strategyMode === 'AVALANCHE' ? '1px solid var(--neon-cyan, #00f0ff)' : '1px solid rgba(255,255,255,0.05)',
                  color: strategyMode === 'AVALANCHE' ? 'var(--neon-cyan, #00f0ff)' : '#64748b',
                  padding: '12px', borderRadius: '6px', fontWeight: '800', fontSize: '11px', cursor: 'pointer', letterSpacing: '0.5px'
                }}
              >
                AVALANCHE
              </button>
            </div>

            <p style={{ margin: 0, color: '#64748b', fontSize: '12px', lineHeight: '1.5' }}>
              {strategyMode === 'SNOWBALL' 
                ? "The Snowball engine prioritizes accounts with the lowest balances first, generating swift emotional wins to build structured repayment momentum."
                : "The Avalanche engine prioritizes liabilities with the highest interest rates first, mathematically minimizing your overall lifetime interest leak."
              }
            </p>
          </div>

          {/* STRATEGIC MILESTONES */}
          <div style={{ background: 'rgba(11, 19, 43, 0.4)', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '12px' }}>STRATEGIC MILESTONES</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ color: '#fff', fontSize: '13px' }}>Estimated Freedom Window</span>
              <span style={{ color: 'var(--neon-green, #00ffa0)', fontWeight: '900', fontSize: '18px', fontFamily: 'Space Grotesk' }}>{estimatedFreedomMonths} Months</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: '12px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: 'var(--neon-green, #00ffa0)' }}></div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: NUMBERS & LIVE PRIORITY STACK */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'rgba(11, 19, 43, 0.4)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #E74C3C' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700' }}>TOTAL MANAGED EXPOSURE</span>
              <h3 style={{ fontSize: '22px', margin: '4px 0 0 0', fontWeight: '900', color: '#fff', fontFamily: 'Space Grotesk' }}>KES {totalManagedExposure.toLocaleString()}</h3>
            </div>
            <div style={{ background: 'rgba(11, 19, 43, 0.4)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #E74C3C' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700' }}>BASELINE COMMITMENT</span>
              <h3 style={{ fontSize: '22px', margin: '4px 0 0 0', fontWeight: '900', color: '#E74C3C', fontFamily: 'Space Grotesk' }}>KES {baselineCommitment.toLocaleString()}/mo</h3>
            </div>
          </div>

          {/* DYNAMIC PRIORITY ROUTING STACK */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '11px', color: 'var(--neon-cyan, #00f0ff)', fontWeight: '800', letterSpacing: '0.5px' }}>
              PRIORITY ROUTING STACK ({strategyMode} ORDER)
            </span>

            {prioritizedDebts.map((debt, index) => (
              <div 
                key={debt.id || index} 
                style={{ 
                  background: index === 0 ? 'rgba(0, 240, 255, 0.04)' : 'rgba(5, 9, 20, 0.3)', 
                  border: index === 0 ? '1px solid #00f0ff' : '1px solid rgba(255,255,255,0.04)', 
                  padding: '16px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {index === 0 && <span style={{ fontSize: '9px', background: 'rgba(0,240,255,0.15)', color: '#00f0ff', padding: '2px 6px', borderRadius: '3px', fontWeight: '800' }}>ACTIVE STRATEGIC TARGET</span>}
                    <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>{debt.name}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '4px' }}>Interest Rate: {debt.interestRate}%</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#fff', fontWeight: '700', fontSize: '15px', fontFamily: 'Space Grotesk', display: 'block' }}>KES {parseFloat(debt.balance || 0).toLocaleString()}</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Min: KES {parseFloat(debt.minimumPayment || debt.minPayment || 0).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// CRITICAL: Make sure this export match name matches whatever your router is looking for!
export default DebtPayoffStrategies;