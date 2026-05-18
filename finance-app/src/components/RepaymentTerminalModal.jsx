import React, { useState } from 'react';
import { useFinanceData } from '../context/FinanceContext';

const RepaymentTerminalModal = ({ isOpen, onClose, debt }) => {
  const { addTransaction, debts, addDebt, deleteDebt } = useFinanceData() || {};
  const [payAmount, setPayAmount] = useState('');

  if (!isOpen || !debt) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payment = parseFloat(payAmount);
    if (isNaN(payment) || payment <= 0) return;

    // 1. Process local context variable mutations
    const updatedBalance = Math.max(0, (parseFloat(debt.balance) || 0) - payment);
    
    // Quick swap inline state mutation safely inside the provider mapping layout
    debt.balance = updatedBalance;

    // 2. Clear transactional historical feeds tracking payment allocations
    if (addTransaction) {
      addTransaction({
        description: `Paydown: ${debt.name}`,
        amount: payment,
        type: 'expense',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
      });
    }

    setPayAmount('');
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(3, 5, 11, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
      <div style={{ background: '#0a0f1e', border: '1px solid rgba(231,76,60,0.25)', borderRadius: '16px', width: '400px', padding: '24px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ color: '#E74C3C', fontSize: '12px', fontWeight: '800' }}>⚡ REPAYMENT INTERCEPT CONSOLE</span>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '20px', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>ACTIVE TARGET ACCOUNT</div>
          <div style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>{debt.name}</div>
          <div style={{ color: '#E74C3C', fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>Outstanding: KES {parseFloat(debt.balance).toLocaleString()}</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>DISBURSEMENT REMITTANCE VALUE (KES)</label>
            <input 
              type="number" required autoFocus max={debt.balance} placeholder="Enter payment value..."
              value={payAmount} onChange={(e) => setPayAmount(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#050813', border: '1px solid #E74C3C', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', background: '#E74C3C', color: '#000', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: '800', cursor: 'pointer' }}>
            EXECUTE AMORTIZATION REMITTANCE
          </button>
        </form>
      </div>
    </div>
  );
};

export default RepaymentTerminalModal;