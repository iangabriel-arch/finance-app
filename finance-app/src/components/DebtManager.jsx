import React, { useState } from 'react';
import { useFinanceData } from '../context/FinanceContext';
import DebtCard from './DebtCard';
import PayoffTimeline from './PayoffTimeline';
import StrategyComparison from './StrategyComparison';
import DebtProjectionGraph from './DebtProjectionGraph';
import SimulationSandbox from './SimulationSandbox';

const DebtManager = () => {
  const context = useFinanceData() || {};
  const { 
    debts = [], 
    addDebt, 
    deleteDebt, 
    settings = { strategy: 'avalanche', extraPayment: 0 }, 
    setStrategy,
    setExtraPayment 
  } = context;

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', lender: '', balance: '', interestRate: '', minPayment: '' });

  const totalDebt = debts.reduce((acc, d) => {
    const val = parseFloat(d.balance);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const totalMinPayment = debts.reduce((acc, d) => {
    const val = parseFloat(d.minPayment);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const weightedInterest = debts.length ? (debts.reduce((acc, d) => {
    const bal = parseFloat(d.balance) || 0;
    const rate = parseFloat(d.interestRate) || 0;
    return acc + (bal * rate);
  }, 0) / totalDebt || 0) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    addDebt({
      ...formData,
      id: `debt_${Date.now()}`,
      balance: parseFloat(formData.balance) || 0,
      interestRate: parseFloat(formData.interestRate) || 0,
      minPayment: parseFloat(formData.minPayment) || 0
    });
    setShowForm(false);
    setFormData({ name: '', lender: '', balance: '', interestRate: '', minPayment: '' });
  };

  return (
    <div className="debt-manager-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. LIABILITIES SUMMARY HEADER */}
      <div className="consumer-card summary-card" style={{ borderLeft: '4px solid var(--neon-cyan)', overflow: 'hidden' }}>
        <div className="summary-split" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
          <div>
            <span className="label">Total Managed Liabilities</span>
            <h1 className="liability-total-text" style={{ fontSize: '36px', fontWeight: '800', margin: '4px 0 12px 0', fontFamily: 'Space Grotesk' }}>
              Ksh {totalDebt.toLocaleString()}
            </h1>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', flexWrap: 'wrap' }}>
              <span><strong style={{ color: 'var(--neon-red)' }}>↓ 4.2%</strong> vs Last Month</span>
              <span style={{ color: 'var(--text-muted)' }}>Avg: <strong>{weightedInterest.toFixed(1)}% APR</strong></span>
            </div>
          </div>

          <div className="summary-commitment-block" style={{ textAlign: 'right' }}>
            <span className="label">Next Commitment</span>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginTop: '4px', color: '#fff' }}>
              Ksh {totalMinPayment.toLocaleString()} <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '400' }}>/mo</span>
            </h3>
          </div>
        </div>

        <div className="strategy-selector-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '10px' }}>
            {['snowball', 'avalanche'].map(strat => (
              <button
                key={strat}
                onClick={() => setStrategy(strat)}
                style={{
                  padding: '6px 14px', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
                  background: settings.strategy === strat ? 'var(--neon-cyan)' : 'transparent',
                  color: settings.strategy === strat ? '#030712' : 'var(--text-muted)'
                }}
              >
                {strat}
              </button>
            ))}
          </div>
          
          <span style={{ fontSize: '11px', color: 'var(--neon-green)', fontWeight: '500' }}>
            ⚡ Blueprint: <strong>{settings.strategy.toUpperCase()}</strong>
          </span>
        </div>
      </div>

      {/* 2. PERSISTENT CHARTS AND TRACKERS */}
      <PayoffTimeline debts={debts} />
      
      <div className="graph-container-wrapper" style={{ width: '100%', overflowX: 'hidden' }}>
        <DebtProjectionGraph />
      </div>

      {/* 3. DYNAMIC CONTENT SPLIT WORKSPACE */}
      <div className="debt-workspace-grid">
        
        {/* LEDGER FEED */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Liability Ledger</h3>
            <button 
              onClick={() => setShowForm(true)} 
              style={{ background: 'var(--neon-green)', color: '#030712', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '11px', cursor: 'pointer' }}
            >
              + NEW ENTRY
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {debts.map((debt, index) => (
              <DebtCard 
                key={debt.id || `debt-row-id-${index}`} 
                debt={debt} 
                onDelete={deleteDebt} 
              />
            ))}
          </div>
        </div>

        {/* CONTROLS FEED */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="consumer-card" style={{ border: '1px solid rgba(0, 255, 170, 0.15)' }}>
            <h3 className="label" style={{ color: 'var(--neon-green)' }}>Command Action Center</h3>
            
            <div style={{ margin: '12px 0', padding: '12px', background: 'rgba(0, 255, 170, 0.02)', borderRadius: '10px', border: '1px solid rgba(0,255,170,0.06)' }}>
              <p style={{ fontSize: '12px', lineHeight: '1.5', color: '#fff', margin: 0 }}>
                👉 Pay an extra <strong style={{color: 'var(--neon-cyan)'}}>Ksh {(settings.extraPayment || 0).toLocaleString()}</strong> directly to your top prioritization tier line item.
              </p>
            </div>

            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Accelerator</span>
                <span style={{ color: 'var(--neon-cyan)', fontWeight: '700' }}>Ksh {parseInt(settings.extraPayment || 0).toLocaleString()}</span>
              </div>
              <input 
                type="range" min="0" max="100000" step="2000"
                value={settings.extraPayment || 0}
                onChange={e => setExtraPayment(parseInt(e.target.value) || 0)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <StrategyComparison />
          <SimulationSandbox />
        </div>

      </div>

      {/* REGISTRATION OVERLAY SYSTEM */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.9)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '16px' }}>
          <div className="consumer-card" style={{ width: '100%', maxWidth: '400px', border: '1px solid var(--neon-cyan)' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Register Exposure</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input required className="cyber-input" placeholder="Account Identifier" onChange={e => setFormData({...formData, name: e.target.value})} />
              <input className="cyber-input" placeholder="Lending Institution" onChange={e => setFormData({...formData, lender: e.target.value})} />
              <input required type="number" className="cyber-input" placeholder="Principal Balance (Ksh)" onChange={e => setFormData({...formData, balance: e.target.value})} />
              <input required type="number" step="0.1" className="cyber-input" placeholder="Interest Rate (APR %)" onChange={e => setFormData({...formData, interestRate: e.target.value})} />
              <input required type="number" className="cyber-input" placeholder="Minimum Monthly Payment" onChange={e => setFormData({...formData, minPayment: e.target.value})} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="submit" style={{ flex: 1, background: 'var(--neon-cyan)', color: '#030712', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>COMMIT DATA</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ background: 'transparent', color: '#fff', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' }}>ABORT</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSS LOCAL RESPONSIVE WRAPPER ENHANCEMENTS */}
      <style>{`
        .debt-workspace-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .debt-workspace-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          
          .summary-split {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          
          .summary-commitment-block {
            text-align: left !important;
            width: 100%;
            padding-top: 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.03);
          }
          
          .liability-total-text {
            font-size: 28px !important;
          }
        }
      `}</style>

    </div>
  );
};

export default DebtManager;