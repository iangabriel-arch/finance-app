import React from 'react';
import { useFinanceData } from '../context/FinanceContext';

const RecentTransactions = () => {
  const { transactions = [], deleteTransaction } = useFinanceData() || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
      {transactions.length === 0 ? (
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
          No ledger entries logged.
        </div>
      ) : (
        transactions.map((tx) => (
          <div 
            key={tx.id} 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              padding: '10px 14px',
              borderRadius: '10px'
            }}
          >
            <div style={{ minWidth: 0, flex: 1, paddingRight: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {tx.text}
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{tx.category} • {tx.date}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{
                fontSize: '13px',
                fontWeight: '800',
                fontFamily: 'Space Grotesk',
                color: tx.type === 'income' ? 'var(--neon-green)' : 'var(--neon-red)'
              }}>
                {tx.type === 'income' ? '+' : '-'} KES {Math.abs(tx.amount).toLocaleString()}
              </span>

              <button 
                onClick={() => deleteTransaction && deleteTransaction(tx.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.25)',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--neon-red)'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.25)'}
              >
                ×
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentTransactions;