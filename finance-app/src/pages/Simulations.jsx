import React, { useState } from 'react';
import { useFinanceData } from '../context/FinanceContext';

const Simulations = () => {
  const { derivedNetMonthlyCashFlow = 0, securedLiquidReserves = 0, formatCurrency } = useFinanceData();
  
  // --- STATE FOR FOREX SIMULATOR ---
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  
  // Benchmark conversion rates (KES per foreign unit)
  const exchangeRates = { 
    USD: 0.0076, // 1 KES = ~$0.0076 USD
    EUR: 0.0070, // 1 KES = ~€0.0070 EUR
    GBP: 0.0059  // 1 KES = ~£0.0059 GBP
  }; 

  const convertedCashFlow = (derivedNetMonthlyCashFlow * exchangeRates[selectedCurrency]).toFixed(2);
  const convertedReserves = (securedLiquidReserves * exchangeRates[selectedCurrency]).toFixed(2);

  // Styling Variables
  const cardStyle = {
    background: 'rgba(13, 20, 38, 0.45)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px 0 rgba(0, 4, 15, 0.2)',
    maxWidth: '550px',
    margin: '0 auto'
  };

  const inputStyle = {
    padding: '14px',
    width: '100%',
    background: '#060a12',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#3b82f6',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '12px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', color: '#f1f5f9', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: '700' }}>Global Valuation & Forex Sandbox</h2>
        <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Evaluate purchasing power conversions against alternative global legal tenders.</p>
      </div>

      {/* GLOBAL MACRO FOREX RADAR CARD */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '50%' }} />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Forex Purchasing Power Simulator</h3>
        </div>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px', lineHeight: '1.5' }}>
          View how currency shifts alter real asset depth. When studying asset allocation or international trades, switching anchors demonstrates the stability of your localized metrics against global foreign exchange standards.
        </p>

        <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>Target Foreign Currency Anchor</label>
        <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} style={inputStyle}>
          <option value="USD">USD - United States Dollar ($)</option>
          <option value="EUR">EUR - Eurozone (€)</option>
          <option value="GBP">GBP - British Pound Sterling (£)</option>
        </select>

        {/* METRIC ROW 1: CASH FLOW CONVERSION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', background: '#060a12', padding: '16px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Local Cash Flow:</span>
            <span style={{ fontSize: '13px', fontFamily: '"JetBrains Mono", monospace' }}>{formatCurrency(derivedNetMonthlyCashFlow)}/mo</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#3b82f6', fontWeight: '600' }}>Hedged Counterpart:</span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#fff', fontFamily: '"JetBrains Mono", monospace' }}>
              {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '£'}{Number(convertedCashFlow).toLocaleString()} /mo
            </span>
          </div>
        </div>

        {/* METRIC ROW 2: LIQUID ASSET CONVERSION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px', background: '#060a12', padding: '16px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Total Asset Reserves:</span>
            <span style={{ fontSize: '13px', fontFamily: '"JetBrains Mono", monospace' }}>{formatCurrency(securedLiquidReserves)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#3b82f6', fontWeight: '600' }}>Hedged Counterpart:</span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#fff', fontFamily: '"JetBrains Mono", monospace' }}>
              {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '£'}{Number(convertedReserves).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Simulations;