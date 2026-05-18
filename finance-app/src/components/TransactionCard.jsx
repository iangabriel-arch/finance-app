import React from 'react';
import { formatCurrency } from '../utils/format';

const TransactionCard = ({ transaction }) => {
  return (
    <div className="cyber-card" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      marginBottom: '10px',
      padding: '1rem' 
    }}>
      <div>
        <h4 style={{ margin: 0 }}>{transaction.name}</h4>
        <small style={{ color: '#94a3b8' }}>{transaction.category}</small>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontWeight: 'bold', color: transaction.amount < 0 ? '#ff4444' : '#00ffcc' }}>
          {formatCurrency(transaction.amount)}
        </div>
        <small style={{ color: '#94a3b8' }}>{transaction.date}</small>
      </div>
    </div>
  );
};

export default TransactionCard;