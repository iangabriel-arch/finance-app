import React from 'react';
import { useFinanceData } from '../context/FinanceContext';

const CategoryBreakdown = () => {
  const { transactions = [] } = useFinanceData() || {};

  // Group real inputs dynamically
  const categoriesMap = transactions.reduce((acc, tx) => {
    if (tx.type === 'expense') {
      // Basic automatic fallback category parsing or default to 'General'
      const cat = tx.category || 'Living'; 
      acc[cat] = (acc[cat] || 0) + parseFloat(tx.amount || 0);
    }
    return acc;
  }, {});

  const totalExpense = Object.values(categoriesMap).reduce((sum, val) => sum + val, 0);

  // Default fallbacks to prevent empty state rendering gaps
  const items = totalExpense > 0 
    ? Object.entries(categoriesMap).map(([name, value]) => ({ name, value, percent: (value / totalExpense) * 100 }))
    : [
        { name: 'Fixed Allocations', value: 0, percent: 45 },
        { name: 'Discretionary', value: 0, percent: 35 },
        { name: 'System Deficits', value: 0, percent: 20 }
      ];

  // Neon palette variations for categorical context grouping
  const colors = ['var(--neon-cyan)', 'var(--neon-purple)', 'var(--neon-green)', '#f43f5e'];

  return (
    <div className="consumer-card">
      <h3 className="label">Dynamic Category Outlays</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
        {items.map((item, index) => (
          <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#fff', fontWeight: '500' }}>{item.name}</span>
              <span style={{ color: 'var(--text-muted)' }}>
                {item.value > 0 ? `Ksh ${item.value.toLocaleString()} ` : ''}({item.percent.toFixed(0)}%)
              </span>
            </div>
            
            {/* COMPACT SEGMENTED BAR ROW */}
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${item.percent}%`, 
                height: '100%', 
                background: colors[index % colors.length] 
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;