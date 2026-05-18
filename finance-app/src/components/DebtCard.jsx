import React from 'react';

const DebtCard = ({ debt, onOpenRepayment }) => {
  const balance = parseFloat(debt.balance) || 0;
  const minPayment = parseFloat(debt.minimumPayment || debt.minPayment) || 0;

  return (
    <div style={{ background: 'rgba(11, 19, 43, 0.45)', border: '1px solid rgba(231, 76, 60, 0.12)', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
      
      <div>
        <span style={{ fontSize: '9px', background: 'rgba(231, 76, 60, 0.15)', color: '#E74C3C', padding: '2px 6px', borderRadius: '3px', fontWeight: '800' }}>
          {debt.type || 'LIABILITY BURDEN'}
        </span>
        <h5 style={{ color: '#fff', margin: '6px 0 2px 0', fontSize: '14px', fontWeight: '700' }}>{debt.name}</h5>
        <div style={{ fontSize: '11px', color: '#64748b' }}>Interest Burden: <strong style={{ color: '#fff' }}>{debt.interestRate}%</strong></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '10px' }}>
        <div>
          <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>REMAINING BURDEN</span>
          <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px' }}>KES {balance.toLocaleString()}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>MIN COMMITMENT</span>
          <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px' }}>KES {minPayment.toLocaleString()}</span>
        </div>
      </div>

      {/* FIXED ONCLICK LINKING INTERFACE */}
      <button 
        onClick={() => onOpenRepayment && onOpenRepayment(debt)}
        style={{ width: '100%', background: 'rgba(231, 76, 60, 0.08)', border: '1px solid rgba(231, 76, 60, 0.2)', borderRadius: '6px', padding: '8px', color: '#E74C3C', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '4px' }}
      >
        🔽 OPEN REPAYMENT TERMINAL
      </button>
    </div>
  );
};

export default DebtCard;