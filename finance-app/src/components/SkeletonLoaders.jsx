import React from 'react';

const PulseWrapper = ({ children, style }) => (
  <div style={{ ...style }}>
    {children}
    <style>{`
      @keyframes pulse { 0% { opacity: 1 } 50% { opacity: 0.4 } 100% { opacity: 1 } }
      .skeleton-block { animation: pulse 1.5s infinite ease-in-out; background: rgba(255, 255, 255, 0.05); border-radius: 6px; }
    `}</style>
  </div>
);

export const SkeletonDebtCard = () => (
  <PulseWrapper className="consumer-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', margin: '8px 0' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '60%' }}>
      <div className="skeleton-block" style={{ height: '16px', width: '40%' }} />
      <div className="skeleton-block" style={{ height: '12px', width: '70%' }} />
    </div>
    <div className="skeleton-block" style={{ height: '32px', width: '20%', borderRadius: '8px' }} />
  </PulseWrapper>
);

export const SkeletonGoalCard = () => (
  <PulseWrapper className="consumer-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '8px 0' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div className="skeleton-block" style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="skeleton-block" style={{ height: '16px', width: '100px' }} />
          <div className="skeleton-block" style={{ height: '11px', width: '60px' }} />
        </div>
      </div>
      <div className="skeleton-block" style={{ width: '70px', height: '70px', borderRadius: '50%' }} />
    </div>
    <div className="skeleton-block" style={{ height: '40px', width: '100%' }} />
  </PulseWrapper>
);

export const SkeletonDashboard = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <PulseWrapper key={i} className="consumer-card" style={{ height: '90px' }}>
          <div className="skeleton-block" style={{ height: '12px', width: '80px', marginBottom: '8px' }} />
          <div className="skeleton-block" style={{ height: '24px', width: '130px' }} />
        </PulseWrapper>
      ))}
    </div>
    <div className="debt-workspace-grid" style={{ gap: '24px' }}>
      <div><SkeletonDebtCard /><SkeletonDebtCard /></div>
      <div><SkeletonGoalCard /></div>
    </div>
  </div>
);