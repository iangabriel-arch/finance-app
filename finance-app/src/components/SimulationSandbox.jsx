import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useFinanceData } from '../context/FinanceContext';

const SimulationSandbox = () => {
  const { debts = [] } = useFinanceData() || {};
  const [windfall, setWindfall] = useState(0);

  const simulation = useMemo(() => {
    const totalDebt = debts.reduce((acc, d) => acc + (parseFloat(d.balance) || 0), 0);
    const monthlyMin = debts.reduce((acc, d) => acc + (parseFloat(d.minPayment) || 0), 0);
    
    if (totalDebt === 0 || monthlyMin === 0) return { monthsSaved: 0, cashSaved: 0 };

    const baselineMonths = totalDebt / monthlyMin;
    const simulatedDebt = Math.max(0, totalDebt - windfall);
    const simulatedMonths = simulatedDebt / monthlyMin;

    const monthsSaved = Math.max(0, Math.round(baselineMonths - simulatedMonths));
    const cashSaved = Math.round(windfall * 0.18 * (monthsSaved / 12));

    return { monthsSaved, cashSaved };
  }, [debts, windfall]);

  return (
    <div className="consumer-card" style={{ border: '1px solid rgba(157, 78, 221, 0.2)' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ 
          background: 'rgba(157, 78, 221, 0.1)', 
          color: 'var(--neon-purple)', 
          fontSize: '10px', 
          fontWeight: '800', 
          padding: '4px 8px', 
          borderRadius: '6px',
          textTransform: 'uppercase'
        }}>Quantum Engine</span>
        <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Windfall Simulator</h3>
      </div>
      
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
        Simulate injecting a one-time lump sum payment to calculate your interest escape velocity.
      </p>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Lump Sum Injection</span>
          <span style={{ color: 'var(--neon-purple)', fontWeight: '700' }}>Ksh {windfall.toLocaleString()}</span>
        </div>
        <input 
          type="range" min="0" max="150000" step="5000"
          value={windfall}
          onChange={e => setWindfall(parseInt(e.target.value) || 0)}
          style={{ width: '100%' }}
        />
      </div>

      <div className="sandbox-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ background: 'rgba(0,0,0,0.15)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.02)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TIME EXPEDITED</div>
          <motion.div 
            animate={{ scale: windfall > 0 ? [1, 1.05, 1] : 1 }}
            style={{ fontSize: '18px', fontWeight: '800', color: 'var(--neon-purple)', marginTop: '4px', fontFamily: 'Space Grotesk' }}
          >
            {simulation.monthsSaved} {simulation.monthsSaved === 1 ? 'Month' : 'Months'} Early
          </motion.div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.15)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.02)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>EST. INTEREST SAVED</div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--neon-green)', marginTop: '4px', fontFamily: 'Space Grotesk' }} >
            Ksh {simulation.cashSaved.toLocaleString()}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .sandbox-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SimulationSandbox;