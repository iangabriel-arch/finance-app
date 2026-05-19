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
    const numericValue = Number(value) || 0;
    if (compactNotation && numericValue >= 1000) {
      return 'KES ' + new Intl.NumberFormat('en-KE', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1
      }).format(numericValue);
    }
    return 'KES ' + Math.round(numericValue).toLocaleString('en-KE');
  };

  const addLog = (entry) => {
    const newLog = {
      ...entry,
      amount: Number(entry.amount) || 0,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })
    };
    setLogs(prev => [newLog, ...prev]);

    if (entry.type === 'DEBT_PAYMENT' && entry.associatedDebtId) {
      setDebts(prevDebts => prevDebts.map(debt => {
        if (debt.id === entry.associatedDebtId) {
          return { ...debt, balance: Math.max(0, Number(debt.balance) - Number(entry.amount)) };
        }
        return debt;
      }));
    }
  };

  const addDebt = (debtData) => setDebts(prev => [...prev, { ...debtData, id: crypto.randomUUID(), balance: Number(debtData.balance) }]);
  const addReserve = (reserveData) => setReserves(prev => [...prev, { ...reserveData, id: crypto.randomUUID(), currentStanding: Number(reserveData.currentStanding), targetGoalCap: Number(reserveData.targetGoalCap) }]);
  const deleteDebt = (id) => setDebts(prev => prev.filter(d => d.id !== id));
  const deleteLog = (id) => setLogs(prev => prev.filter(l => l.id !== id));
  const deleteReserve = (id) => setReserves(prev => prev.filter(r => r.id !== id));

  // FIXED: Explicit type-casting & flexible manual increment parameters
  const topUpReserve = (id, manualAmount = null) => {
    setReserves(prevReserves => prevReserves.map(res => {
      if (res.id === id) {
        // Use manual parameter value, fallback to setting, fallback to 5000 default
        const incrementValue = manualAmount !== null 
          ? Number(manualAmount) 
          : (Number(res.monthlyTopUpSetting) || 5000);
        
        return { 
          ...res, 
          currentStanding: Number(res.currentStanding || 0) + incrementValue 
        };
      }
      return res;
    }));
  };

  const totalOutstandingLiabilities = debts.reduce((sum, d) => sum + (Number(d.balance) || 0), 0);
  const securedLiquidReserves = reserves.reduce((sum, r) => sum + (Number(r.currentStanding) || 0), 0);
  const dynamicIncome = logs.filter(l => l.type === 'INCOME').reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
  const dynamicExpenses = logs.filter(l => l.type === 'EXPENSE').reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
  const derivedNetMonthlyCashFlow = dynamicIncome - dynamicExpenses;

  return (
    <FinanceContext.Provider value={{
      debts, reserves, logs,
      addDebt, addReserve, topUpReserve, addLog, deleteDebt, deleteLog, deleteReserve,
      totalOutstandingLiabilities, securedLiquidReserves, derivedNetMonthlyCashFlow,
      compactNotation, setCompactNotation, formatCurrency
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