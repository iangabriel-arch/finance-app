import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [debts, setDebts] = useState(() => {
    const saved = localStorage.getItem('spendify_debts');
    return saved ? JSON.parse(saved) : [];
  });

  const [reserves, setReserves] = useState(() => {
    const saved = localStorage.getItem('spendify_reserves');
    return saved ? JSON.parse(saved) : [];
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('spendify_logs');
    return saved ? JSON.parse(saved) : [];
  });

  // --- NEW: COMPACT FORMAT TOGGLE STATE ---
  const [compactNotation, setCompactNotation] = useState(() => {
    const saved = localStorage.getItem('spendify_compact');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('spendify_debts', JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem('spendify_reserves', JSON.stringify(reserves));
  }, [reserves]);

  useEffect(() => {
    localStorage.setItem('spendify_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('spendify_compact', JSON.stringify(compactNotation));
  }, [compactNotation]);

  // --- DYNAMIC CURRENCY FORMATTING ENGINE ---
  const formatCurrency = (value) => {
    if (compactNotation && value >= 1000) {
      // Formats 50000 -> 50K or 1250300 -> 1.25M
      return 'KES ' + new Intl.NumberFormat('en-KE', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1
      }).format(value);
    }
    // Default full view: KES 50,000
    return 'KES ' + Math.round(value).toLocaleString('en-KE');
  };

  const addLog = (entry) => {
    const newLog = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })
    };
    setLogs(prev => [newLog, ...prev]);

    if (entry.type === 'DEBT_PAYMENT' && entry.associatedDebtId) {
      setDebts(prevDebts => prevDebts.map(debt => {
        if (debt.id === entry.associatedDebtId) {
          return { ...debt, balance: Math.max(0, debt.balance - entry.amount) };
        }
        return debt;
      }));
    }
  };

  const addDebt = (debtData) => setDebts(prev => [...prev, { ...debtData, id: crypto.randomUUID() }]);
  const addReserve = (reserveData) => setReserves(prev => [...prev, { ...reserveData, id: crypto.randomUUID() }]);
  const deleteDebt = (id) => setDebts(prev => prev.filter(d => d.id !== id));
  const deleteLog = (id) => setLogs(prev => prev.filter(l => l.id !== id));
  const deleteReserve = (id) => setReserves(prev => prev.filter(r => r.id !== id));

  const topUpReserve = (id) => {
    setReserves(prevReserves => prevReserves.map(res => {
      if (res.id === id) {
        return { ...res, currentStanding: res.currentStanding + (res.monthlyTopUpSetting || 0) };
      }
      return res;
    }));
  };

  const totalOutstandingLiabilities = debts.reduce((sum, d) => sum + d.balance, 0);
  const securedLiquidReserves = reserves.reduce((sum, r) => sum + r.currentStanding, 0);
  const dynamicIncome = logs.filter(l => l.type === 'INCOME').reduce((sum, l) => sum + l.amount, 0);
  const dynamicExpenses = logs.filter(l => l.type === 'EXPENSE').reduce((sum, l) => sum + l.amount, 0);
  const derivedNetMonthlyCashFlow = dynamicIncome - dynamicExpenses;

  return (
    <FinanceContext.Provider value={{
      debts, reserves, logs,
      addDebt, addReserve, topUpReserve, addLog, deleteDebt, deleteLog, deleteReserve,
      totalOutstandingLiabilities, securedLiquidReserves, derivedNetMonthlyCashFlow,
      compactNotation, setCompactNotation, formatCurrency // <-- Exported tools
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinanceData = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinanceData must be used inside a FinanceProvider block');
  return context;
};