import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TransactionInput from '../components/TransactionInput';
import BudgetOverview from '../components/BudgetOverview';
import RecentTransactions from '../components/RecentTransactions';
import CategoryBreakdown from '../components/CategoryBreakdown';
import DebtManager from '../components/DebtManager';

const InsightDashboard = () => {
  const [mobileTab, setMobileTab] = useState('cashflow'); // Used strictly for phone viewports

  return (
    <div className="app-viewport-wrapper">
      {/* Universal Sticky Glass Header */}
      <Navbar score={82} />
      
      <div className="dashboard-content-container">
        
        {/* =========================================================
            1. ULTIMATE HIGH-DENSITY DESKTOP LAYOUT (>= 1024px)
           ========================================================= */}
        <div className="desktop-hardware-grid">
          
          {/* LEFT PANEL: CASHFLOW SIDEBAR */}
          <aside className="desktop-left-column">
            <div className="cyber-sticky-scroller">
              <div className="consumer-card interactive-glow-card">
                <h3 className="label" style={{ color: 'var(--neon-cyan)', marginBottom: '16px' }}>Quick Transaction Logger</h3>
                <TransactionInput />
              </div>
              <BudgetOverview />
              <CategoryBreakdown />
              <RecentTransactions />
            </div>
          </aside>

          {/* MAIN CENTER PANEL: THE LIABILITY LIQUIDITY CONSOLE */}
          <main className="desktop-center-column">
            <DebtManager />
          </main>
          
        </div>

        {/* =========================================================
            2. IMMERSIVE NATIVE MOBILE VIEWPORT (< 1024px)
           ========================================================= */}
        <div className="mobile-hardware-viewport">
          {mobileTab === 'cashflow' ? (
            <div className="mobile-stack-stream">
              <div className="consumer-card">
                <h3 className="label" style={{ color: 'var(--neon-cyan)', marginBottom: '12px' }}>Quick Logger</h3>
                <TransactionInput />
              </div>
              <BudgetOverview />
              <CategoryBreakdown />
              <RecentTransactions />
            </div>
          ) : (
            <div className="mobile-stack-stream">
              <DebtManager />
            </div>
          )}
        </div>

      </div>

      {/* MOBILE INTERACTIVE CONTROLLER (Hidden completely on Desktop) */}
      <div className="mobile-navigation-dock">
        <button onClick={() => setMobileTab('cashflow')} className={`dock-action-btn ${mobileTab === 'cashflow' ? 'active' : ''}`}>
          <span className="dock-icon">💳</span>
          <span>Cashflow</span>
        </button>
        <button onClick={() => setMobileTab('debts')} className={`dock-action-btn ${mobileTab === 'debts' ? 'active' : ''}`}>
          <span className="dock-icon">📉</span>
          <span>Liabilities</span>
        </button>
      </div>

    </div>
  );
};

export default InsightDashboard;