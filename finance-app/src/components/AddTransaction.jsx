import React, { useState } from 'react';
import { useFinanceData } from '../context/FinanceContext';

const AddTransaction = () => {
  const { setBudget } = useFinanceData();
  const [formData, setFormData] = useState({ name: '', amount: '', category: 'General' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;

    const newTransaction = {
      id: Date.now(),
      name: formData.name,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: new Date().toISOString().split('T')[0]
    };

    setBudget(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions]
    }));

    setFormData({ name: '', amount: '', category: 'General' });
  };

  return (
    <div className="cyber-card" style={{ marginBottom: '30px' }}>
      <h3 style={{ marginTop: 0 }}>Quick Log</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="What did you buy?" 
          className="cyber-input"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={{ flex: 2, padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
        />
        <input 
          type="number" 
          placeholder="Amount (use - for expense)" 
          className="cyber-input"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          style={{ flex: 1, padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
        />
        <button type="submit" className="active-btn" style={{ 
          padding: '10px 20px', 
          background: 'var(--neon-blue)', 
          border: 'none', 
          borderRadius: '8px', 
          color: 'white', 
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          ADD +
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
