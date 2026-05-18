import React, { useState } from 'react';
import { useFinanceData } from '../context/FinanceContext';

const TransactionInput = () => {
  const { addTransaction } = useFinanceData() || {};
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    if (addTransaction) {
      addTransaction(text, amount, type, type === 'income' ? 'Income' : 'Expense');
    }
    
    setText('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input 
        type="text" 
        placeholder="What did you buy?" 
        className="cyber-input"
        style={{ background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', padding: '12px', borderRadius: '8px', color: '#fff', width: '100%', boxSizing: 'border-box' }}
        value={text} 
        onChange={(e) => setText(e.target.value)}
      />
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="number" 
          placeholder="Amount" 
          className="cyber-input" 
          style={{ flex: 1, background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', padding: '12px', borderRadius: '8px', color: '#fff' }}
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
        />
        <select 
          style={{ background: '#070b19', border: '1px solid rgba(255,255,255,0.08)', padding: '12px', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">EXPENSE</option>
          <option value="income">INCOME</option>
        </select>
        <button type="submit" style={{ background: 'var(--neon-cyan, #00f0ff)', color: '#020613', border: 'none', padding: '0 20px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
          ADD +
        </button>
      </div>
    </form>
  );
};

export default TransactionInput;