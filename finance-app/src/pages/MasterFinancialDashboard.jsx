import React, { useState, useEffect } from 'react';
import { useFinanceData } from '../context/FinanceContext';
import CostVsGrowthChart from '../components/CostVsGrowthChart';

const MasterFinancialDashboard = () => {
  const { 
    debts = [], 
    reserves = [], 
    logs = [], 
    addDebt, 
    addReserve, 
    topUpReserve,
    addLog,
    deleteDebt,
    deleteLog,
    deleteReserve,
    totalOutstandingLiabilities = 0,
    securedLiquidReserves = 0,
    derivedNetMonthlyCashFlow = 0,
    formatCurrency
  } = useFinanceData();

  // --- STATE HANDLERS ---
  const [metricFeedback, setMetricFeedback] = useState('');
  const [reserveFeedback, setReserveFeedback] = useState('');
  const [debtFeedback, setDebtFeedback] = useState('');
  const [vaultFeedback, setVaultFeedback] = useState('');

  const [metricType, setMetricType] = useState('EXPENSE');
  const [metricDesc, setMetricDesc] = useState('');
  const [metricAmount, setMetricAmount] = useState('');
  const [selectedDebtId, setSelectedDebtId] = useState(''); 

  const [reserveGoal, setReserveGoal] = useState('');
  const [initialTopUpRule, setInitialTopUpRule] = useState('');

  const [debtName, setDebtName] = useState('');
  const [debtBalance, setDebtBalance] = useState('');
  const [debtInterest, setDebtInterest] = useState('');
  const [debtMinPayment, setDebtMinPayment] = useState('');

  // --- PROGRESSIVE DISCLOSURE STATES ---
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('overview'); 
  const [expandedSection, setExpandedSection] = useState(null); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- ACTION SUBMISSIONS ---
  const handleLogMetric = (e) => {
    e.preventDefault();
    if (!metricAmount || parseFloat(metricAmount) <= 0) {
      setMetricFeedback('⚠️ Enter a valid amount.');
      return;
    }
    if (metricType === 'DEBT_PAYMENT' && !selectedDebtId) {
      setMetricFeedback('⚠️ Select a liability account.');
      return;
    }

    let dynamicDescription = metricDesc;
    if (metricType === 'DEBT_PAYMENT') {
      const targetDebt = debts.find(d => d.id === selectedDebtId);
      dynamicDescription = `Paid toward: ${targetDebt ? targetDebt.name : 'Debt Balance'}`;
    }

    if (!dynamicDescription) {
      setMetricFeedback('⚠️ Description is required.');
      return;
    }

    addLog({
      type: metricType,
      description: dynamicDescription,
      amount: parseFloat(metricAmount),
      associatedDebtId: metricType === 'DEBT_PAYMENT' ? selectedDebtId : null
    });

    setMetricFeedback(`✨ Entry recorded.`);
    setMetricDesc('');
    setMetricAmount('');
    setSelectedDebtId('');
    setTimeout(() => setMetricFeedback(''), 2500);
  };

  const handleDefineGoal = (e) => {
    e.preventDefault();
    if (!reserveGoal || parseFloat(reserveGoal) <= 0) {
      setReserveFeedback('⚠️ Enter a valid goal.');
      return;
    }
    
    // FIXED: Changed targetGoal to targetGoalCap to align with your Context properties
    addReserve({
      name: 'Emergency Reserve',
      targetGoalCap: parseFloat(reserveGoal),
      currentStanding: 0,
      monthlyTopUpSetting: parseFloat(initialTopUpRule) || 5000
    });
    setReserveFeedback('✨ Savings goal set.');
    setReserveGoal('');
    setInitialTopUpRule('');
    setTimeout(() => setReserveFeedback(''), 2500);
  };

  const handleCreateLiability = (e) => {
    e.preventDefault();
    if (!debtName || !debtBalance || !debtInterest || !debtMinPayment) {
      setDebtFeedback('⚠️ All fields required.');
      return;
    }
    addDebt({
      name: debtName,
      balance: parseFloat(debtBalance),
      interestRate: parseFloat(debtInterest),
      minimumPayment: parseFloat(debtMinPayment)
    });
    setDebtFeedback(`✨ Liability tracked.`);
    setDebtName('');
    setDebtBalance('');
    setDebtInterest('');
    setDebtMinPayment('');
    setTimeout(() => setDebtFeedback(''), 2500);
  };

  // FIXED: Refactored top-up constraints to cascade configuration values smoothly
  const handleVaultTopUp = (reserveItem) => {
    const incrementAmount = reserveItem.monthlyTopUpSetting || 5000;
    
    if (derivedNetMonthlyCashFlow < incrementAmount) {
      setVaultFeedback(`⚠️ Insufficient cash flow to support top-up.`);
      setTimeout(() => setVaultFeedback(''), 3000);
      return;
    }
    
    // Explicitly pass the ID and structural value down
    topUpReserve(reserveItem.id, incrementAmount);
    setVaultFeedback(`Transferred ${formatCurrency(incrementAmount)}`);
    setTimeout(() => setVaultFeedback(''), 3000);
  };

  // --- GLOBAL STYLES ---
  const cardStyle = {
    background: 'rgba(13, 20, 38, 0.45)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    padding: isMobile ? '18px' : '24px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px 0 rgba(0, 4, 15, 0.2)',
  };

  const mobileActionRow = {
    background: '#090e1a',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    minHeight: '48px',
  };

  const inputStyle = {
    padding: '14px',
    width: '100%',
    background: '#060a12',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#fff',
    borderRadius: '10px',
    boxSizing: 'border-box',
    fontSize: '14px',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    marginBottom: '12px',
    outline: 'none'
  };

  const btnStyle = (color) => ({
    padding: '12px',
    width: '100%',
    background: color,
    color: '#050914',
    fontWeight: '600',
    fontSize: '14px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  });

  const tabButtonStyle = (isActive) => ({
    flex: 1,
    padding: '12px 6px',
    background: isActive ? 'rgba(34, 211, 238, 0.08)' : 'transparent',
    border: 'none',
    borderBottom: isActive ? '2px solid #22d3ee' : '2px solid transparent',
    color: isActive ? '#22d3ee' : '#64748b',
    fontWeight: '600',
    fontSize: '13px',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease'
  });

  const numericFont = { fontFamily: '"JetBrains Mono", monospace' };

  // ==========================================
  // RENDER: ADAPTIVE MOBILE LAYOUT
  // ==========================================
  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', boxSizing: 'border-box', padding: '4px' }}>
        
        <div style={{ display: 'flex', background: 'rgba(13, 20, 38, 0.8)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '4px', overflow: 'hidden' }}>
          <button style={tabButtonStyle(activeMobileTab === 'overview')} onClick={() => setActiveMobileTab('overview')}>Overview</button>
          <button style={tabButtonStyle(activeMobileTab === 'actions')} onClick={() => setActiveMobileTab('actions')}>Tools & Entry</button>
          <button style={tabButtonStyle(activeMobileTab === 'ledger')} onClick={() => setActiveMobileTab('ledger')}>Ledger Log</button>
        </div>

        {activeMobileTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ ...cardStyle, borderTop: '3px solid #06b6d4', background: 'linear-gradient(145deg, rgba(13,20,38,0.6), rgba(6,10,18,0.4))' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Net Monthly Cash Flow</span>
              <h2 style={{ margin: '4px 0', fontSize: '26px', fontWeight: '800', color: derivedNetMonthlyCashFlow >= 0 ? '#22d3ee' : '#f87171', ...numericFont }}>
                {formatCurrency(derivedNetMonthlyCashFlow)}
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '8px', color: '#64748b' }}>
                <span>Liabilities: <strong style={{ color: '#f87171', ...numericFont }}>{formatCurrency(totalOutstandingLiabilities)}</strong></span>
                <span>Vaults: <strong style={{ color: '#34d399', ...numericFont }}>{formatCurrency(securedLiquidReserves)}</strong></span>
              </div>
            </div>

            <div style={cardStyle}>
              <div 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setExpandedSection(expandedSection === 'chart' ? null : 'chart')}
              >
                <h3 style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: '#f1f5f9' }}>📈 View 6-Month Projection Trend</h3>
                <span style={{ color: '#64748b', fontSize: '12px' }}>{expandedSection === 'chart' ? 'Collapse' : 'Expand'}</span>
              </div>
              
              {expandedSection === 'chart' && (
                <div style={{ width: '100%', height: '210px', marginTop: '16px', background: 'rgba(5, 9, 22, 0.3)', borderRadius: '12px', padding: '8px', boxSizing: 'border-box' }}>
                  <CostVsGrowthChart debts={debts} reserves={reserves} logs={logs} />
                </div>
              )}
            </div>

            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '600', color: '#fff' }}>Active Savings & Vault Strategy</h3>
              {vaultFeedback && <div style={{ fontSize: '12px', color: '#eab308', mb: '10px', textAlign: 'center' }}>{vaultFeedback}</div>}
              {reserves.length === 0 ? (
                <div style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', padding: '10px' }}>No active asset targets configured yet.</div>
              ) : (
                reserves.map((res) => {
                  const target = Number(res.targetGoalCap) || 1;
                  const percent = Math.min(100, Math.round((Number(res.currentStanding || 0) / target) * 100));
                  return (
                    <div key={res.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#060a12', padding: '12px', borderRadius: '12px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600', color: '#f8fafc', fontSize: '13px' }}>💰 {res.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button 
                            type="button" 
                            onClick={() => handleVaultTopUp(res)} 
                            style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                          >
                            + {formatCurrency(res.monthlyTopUpSetting || 5000)}
                          </button>
                          <button type="button" onClick={() => deleteReserve(res.id)} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '14px', cursor: 'pointer', padding: '4px' }}>✕</button>
                        </div>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: '#0d1426', borderRadius: '3px', overflow: 'hidden', margin: '4px 0' }}>
                        <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', ...numericFont }}>
                        <span>Saved: {formatCurrency(res.currentStanding)} ({percent}%)</span>
                        <span>Goal: {formatCurrency(target)}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '600', color: '#fff' }}>Monitored Liabilities</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {debts.length === 0 ? (
                  <div style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', padding: '10px' }}>No tracked liability profiles found.</div>
                ) : (
                  debts.map((debt) => (
                    <div key={debt.id} style={{ background: '#060a12', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#f1f5f9' }}>⚡ {debt.name}</span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Interest Rate: {debt.interestRate}%</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: '700', color: debt.balance === 0 ? '#34d399' : '#f87171', fontSize: '13px', ...numericFont }}>
                          {debt.balance === 0 ? 'CLEARED' : formatCurrency(debt.balance)}
                        </span>
                        <button type="button" onClick={() => deleteDebt(debt.id)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px', marginLeft: '4px' }}>✕</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeMobileTab === 'actions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ ...cardStyle, padding: '12px' }}>
              <div style={mobileActionRow} onClick={() => setExpandedSection(expandedSection === 'log' ? null : 'log')}>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>📝 Log Cash Transaction / Repayment</span>
                <span style={{ color: '#64748b' }}>{expandedSection === 'log' ? '▼' : '▶'}</span>
              </div>
              {expandedSection === 'log' && (
                <form onSubmit={handleLogMetric} style={{ marginTop: '14px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px' }}>
                  <select value={metricType} onChange={(e) => setMetricType(e.target.value)} style={inputStyle}>
                    <option value="EXPENSE">General Expense Account (-)</option>
                    <option value="INCOME">Income Stream Recieved (+)</option>
                    <option value="DEBT_PAYMENT">Paid off Liability / Debt Repayment (⚡)</option>
                  </select>
                  {metricType === 'DEBT_PAYMENT' ? (
                    <select value={selectedDebtId} onChange={(e) => setSelectedDebtId(e.target.value)} style={{ ...inputStyle, color: '#f87171' }}>
                      <option value="">-- Select Target Liability Account --</option>
                      {debts.map(d => (
                        <option key={d.id} value={d.id}>{d.name} ({formatCurrency(d.balance)})</option>
                      ))}
                    </select>
                  ) : (
                    <input type="text" placeholder="Transaction note memo..." value={metricDesc} onChange={(e) => setMetricDesc(e.target.value)} style={inputStyle} />
                  )}
                  <input type="number" placeholder="Amount (KES)..." value={metricAmount} onChange={(e) => setMetricAmount(e.target.value)} style={inputStyle} />
                  <button type="submit" style={btnStyle('#22d3ee')}>Record Entry</button>
                  {metricFeedback && <div style={{ fontSize: '12px', color: '#34d399', marginTop: '10px', textAlign: 'center' }}>{metricFeedback}</div>}
                </form>
              )}
            </div>

            <div style={{ ...cardStyle, padding: '12px' }}>
              <div style={mobileActionRow} onClick={() => setExpandedSection(expandedSection === 'goal' ? null : 'goal')}>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>🎯 Establish Savings Target Vault</span>
                <span style={{ color: '#64748b' }}>{expandedSection === 'goal' ? '▼' : '▶'}</span>
              </div>
              {expandedSection === 'goal' && (
                <form onSubmit={handleDefineGoal} style={{ marginTop: '14px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px' }}>
                  <input type="number" placeholder="Target Cap Size (KES)..." value={reserveGoal} onChange={(e) => setReserveGoal(e.target.value)} style={inputStyle} />
                  <input type="number" placeholder="Default Monthly Rule Amount (KES)..." value={initialTopUpRule} onChange={(e) => setInitialTopUpRule(e.target.value)} style={inputStyle} />
                  <button type="submit" style={btnStyle('#34d399')}>Register Vault Goal</button>
                  {reserveFeedback && <div style={{ fontSize: '12px', color: '#34d399', marginTop: '10px', textAlign: 'center' }}>{reserveFeedback}</div>}
                </form>
              )}
            </div>

            <div style={{ ...cardStyle, padding: '12px' }}>
              <div style={mobileActionRow} onClick={() => setExpandedSection(expandedSection === 'debt' ? null : 'debt')}>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>⚠️ Setup New Debt Tracking Line</span>
                <span style={{ color: '#64748b' }}>{expandedSection === 'debt' ? '▼' : '▶'}</span>
              </div>
              {expandedSection === 'debt' && (
                <form onSubmit={handleCreateLiability} style={{ marginTop: '14px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px' }}>
                  <input type="text" placeholder="Account Name (e.g. Credit Card)..." value={debtName} onChange={(e) => setDebtName(e.target.value)} style={inputStyle} />
                  <input type="number" placeholder="Outstanding Principal (KES)..." value={debtBalance} onChange={(e) => setDebtBalance(e.target.value)} style={inputStyle} />
                  <input type="number" step="0.1" placeholder="Interest Rate Per Annum (%)" value={debtInterest} onChange={(e) => setDebtInterest(e.target.value)} style={inputStyle} />
                  <input type="number" placeholder="Minimum Monthly Payment Escrow..." value={debtMinPayment} onChange={(e) => setDebtMinPayment(e.target.value)} style={inputStyle} />
                  <button type="submit" style={btnStyle('#f87171')}>Track Account Balance</button>
                  {debtFeedback && <div style={{ fontSize: '12px', color: '#34d399', marginTop: '10px', textAlign: 'center' }}>{debtFeedback}</div>}
                </form>
              )}
            </div>
          </div>
        )}

        {activeMobileTab === 'ledger' && (
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#fff' }}>Historic Activity Ledger</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {logs.length === 0 ? (
                <div style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', padding: '12px' }}>No recorded entries listed.</div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} style={{ background: '#060a12', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <span style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.description}</span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{log.date} • {log.type}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: '700', color: log.type === 'INCOME' ? '#34d399' : log.type === 'DEBT_PAYMENT' ? '#22d3ee' : '#f87171', ...numericFont, fontSize: '13px' }}>
                        {log.type === 'INCOME' ? '+' : '-'} {formatCurrency(log.amount)}
                      </span>
                      <button type="button" onClick={() => deleteLog(log.id)} style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: '11px', cursor: 'pointer' }}>✕</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    );
  }

  // ==========================================
  // RENDER: DESKTOP COMMAND CENTER LAYOUT
  // ==========================================
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '100%', color: '#f1f5f9', fontFamily: '"Plus Jakarta Sans", sans-serif', boxSizing: 'border-box' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', width: '100%' }}>
        <div style={{ ...cardStyle, borderTop: '3px solid #ef4444' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Total Outstanding Liabilities</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: '700', color: '#f87171', ...numericFont }}>
            {formatCurrency(totalOutstandingLiabilities)}
          </h2>
        </div>
        
        <div style={{ ...cardStyle, borderTop: '3px solid #10b981' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Secured Liquid Reserves</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: '700', color: '#34d399', ...numericFont }}>
            {formatCurrency(securedLiquidReserves)}
          </h2>
        </div>

        <div style={{ ...cardStyle, borderTop: '3px solid #06b6d4' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Net Monthly Cash Flow</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: '700', color: derivedNetMonthlyCashFlow >= 0 ? '#22d3ee' : '#f87171', ...numericFont }}>
            {formatCurrency(derivedNetMonthlyCashFlow)}/mo
          </h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(0, 2fr)', gap: '24px', alignItems: 'start', width: '100%' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <form onSubmit={handleLogMetric} style={cardStyle}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#fff' }}>Log New Transaction</h3>
            <select value={metricType} onChange={(e) => setMetricType(e.target.value)} style={{ ...inputStyle, color: '#22d3ee', fontWeight: '600' }}>
              <option value="EXPENSE">General Expense Account (-)</option>
              <option value="INCOME">Income Stream Recieved (+)</option>
              <option value="DEBT_PAYMENT">Paid off Liability / Debt Repayment (⚡)</option>
            </select>
            {metricType === 'DEBT_PAYMENT' ? (
              <select value={selectedDebtId} onChange={(e) => setSelectedDebtId(e.target.value)} style={{ ...inputStyle, color: '#f87171', fontWeight: '600' }}>
                <option value="">-- Select Active Account Being Paid --</option>
                {debts.map(debt => (
                  <option key={debt.id} value={debt.id}>{debt.name} (Remaining: {formatCurrency(debt.balance)})</option>
                ))}
              </select>
            ) : (
              <input type="text" placeholder="Description or Category memo..." value={metricDesc} onChange={(e) => setMetricDesc(e.target.value)} style={inputStyle} />
            )}
            <input type="number" placeholder="Amount (KES)..." value={metricAmount} onChange={(e) => setMetricAmount(e.target.value)} style={inputStyle} />
            <button type="submit" style={btnStyle('#22d3ee')}>Log Transaction</button>
            {metricFeedback && <div style={{ fontSize: '13px', color: '#34d399', marginTop: '10px', textAlign: 'center' }}>{metricFeedback}</div>}
          </form>

          <form onSubmit={handleDefineGoal} style={cardStyle}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#fff' }}>Define Reserve Target</h3>
            <input type="number" placeholder="Target Goal Cap (KES)..." value={reserveGoal} onChange={(e) => setReserveGoal(e.target.value)} style={inputStyle} />
            <input type="number" placeholder="Default Monthly Rule Allocation (KES)..." value={initialTopUpRule} onChange={(e) => setInitialTopUpRule(e.target.value)} style={inputStyle} />
            <button type="submit" style={btnStyle('#34d399')}>Initialize Vault Target</button>
            {reserveFeedback && <div style={{ fontSize: '13px', color: '#34d399', marginTop: '10px', textAlign: 'center' }}>{reserveFeedback}</div>}
          </form>

          <form onSubmit={handleCreateLiability} style={cardStyle}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#fff' }}>Track Liability Account</h3>
            <input type="text" placeholder="Account Name (e.g., M-Shwari loan)..." value={debtName} onChange={(e) => setDebtName(e.target.value)} style={inputStyle} />
            <input type="number" placeholder="Outstanding Balance (KES)..." value={debtBalance} onChange={(e) => setDebtBalance(e.target.value)} style={inputStyle} />
            <input type="number" step="0.1" placeholder="Interest Rate per Annum (%)" value={debtInterest} onChange={(e) => setDebtInterest(e.target.value)} style={inputStyle} />
            <input type="number" placeholder="Minimum Monthly Escrow (KES)..." value={debtMinPayment} onChange={(e) => setDebtMinPayment(e.target.value)} style={inputStyle} />
            <button type="submit" style={btnStyle('#f87171')}>Register Liability</button>
            {debtFeedback && <div style={{ fontSize: '13px', color: '#34d399', marginTop: '10px', textAlign: 'center' }}>{debtFeedback}</div>}
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', overflow: 'hidden' }}>
          <div style={{ ...cardStyle, width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
            <h3 style={{ margin: '0 0 18px 0', fontSize: '16px', fontWeight: '600', color: '#fff' }}>Projections Engine</h3>
            <div style={{ width: '100%', height: '270px', position: 'relative', background: 'rgba(5, 9, 22, 0.3)', borderRadius: '12px', padding: '12px', boxSizing: 'border-box' }}>
              <CostVsGrowthChart debts={debts} reserves={reserves} logs={logs} />
            </div>
          </div>

          <div style={{ ...cardStyle, width: '100%', boxSizing: 'border-box' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600', color: '#fff' }}>Savings & Vault Strategy</h3>
            {vaultFeedback && <div style={{ fontSize: '13px', color: '#eab308', marginBottom: '10px', textAlign: 'center' }}>{vaultFeedback}</div>}
            {reserves.length === 0 ? (
              <div style={{ color: '#64748b', fontSize: '14px' }}>No active targets configured.</div>
            ) : (
              reserves.map((res) => {
                const target = Number(res.targetGoalCap) || 1;
                const percent = Math.min(100, Math.round((Number(res.currentStanding || 0) / target) * 100));
                return (
                  <div key={res.id} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', color: '#f8fafc', fontSize: '15px' }}>💰 {res.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button type="button" onClick={() => handleVaultTopUp(res)} style={{ background: 'rgba(52, 211, 153, 0.12)', border: '1px solid rgba(52, 211, 153, 0.3)', color: '#34d399', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                          Top Up (+{formatCurrency(res.monthlyTopUpSetting || 5000)})
                        </button>
                        <button type="button" onClick={() => deleteReserve(res.id)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '16px', padding: '0 4px' }}>✕</button>
                      </div>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#090e1a', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94a3b8', ...numericFont }}>
                      <span>Saved: {formatCurrency(res.currentStanding)}</span>
                      <span>Target: {formatCurrency(target)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div style={{ ...cardStyle, width: '100%', boxSizing: 'border-box' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#fff' }}>Monitored Liabilities</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {debts.length === 0 ? (
                <div style={{ color: '#64748b', fontSize: '14px', textAlign: 'center' }}>No tracked liability profiles found.</div>
              ) : (
                debts.map((debt) => (
                  <div key={debt.id} style={{ background: '#090e1a', padding: '14px 18px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ display: 'block', fontWeight: '600', fontSize: '15px', color: '#f1f5f9' }}>⚡ {debt.name}</span>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>Interest: {debt.interestRate}% • Min Pay: {formatCurrency(debt.minimumPayment)}/mo</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontWeight: '700', color: debt.balance === 0 ? '#34d399' : '#f87171', fontSize: '15px', ...numericFont }}>
                        {debt.balance === 0 ? 'CLEARED' : formatCurrency(debt.balance)}
                      </span>
                      <button type="button" onClick={() => deleteDebt(debt.id)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* FIXED BOTTOM: RESTORED ENTIRE ACTIVITY LEDGER CLOSURE LOG MAP */}
          <div style={{ ...cardStyle, width: '100%', boxSizing: 'border-box' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#fff' }}>Activity Ledger</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
              {logs.length === 0 ? (
                <div style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', padding: '10px' }}>No tracked transactions on the system ledger.</div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} style={{ background: '#090e1a', padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyBetween: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontWeight: '600', fontSize: '14px', color: '#f1f5f9', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{log.description}</span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{log.date} • {log.type}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontWeight: '700', color: log.type === 'INCOME' ? '#34d399' : log.type === 'DEBT_PAYMENT' ? '#22d3ee' : '#f87171', ...numericFont, fontSize: '14px' }}>
                        {log.type === 'INCOME' ? '+' : '-'} {formatCurrency(log.amount)}
                      </span>
                      <button type="button" onClick={() => deleteLog(log.id)} style={{ background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MasterFinancialDashboard;