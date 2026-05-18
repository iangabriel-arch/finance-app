import React from 'react';

const PayoffTimeline = ({ debts = [] }) => {
  const activeCount = debts.length;
  const standardMonths = activeCount ? Math.max(12, activeCount * 4) : 0;
  const targetYear = new Date().getFullYear() + Math.ceil(standardMonths / 12);

  return (
    <div className="consumer-card">
      <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div>
          <span className="label" style={{ color: 'var(--neon-cyan)' }}>Strategic Milestones</span>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Payoff Horizon Tracker</h3>
        </div>
        <div className="timeline-aside" style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Estimated Freedom Window:</span>
          <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--neon-cyan)', fontFamily: 'Space Grotesk', marginTop: '2px' }}>
            {activeCount > 0 ? `Late ${targetYear} (${standardMonths} Mos)` : 'No Obligations'}
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', height: '40px', marginTop: '28px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.05)' }} />
        
        <div style={{ position: 'absolute', left: '0%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-cyan)', boxShadow: '0 0 8px var(--neon-cyan)' }} />
          <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '6px', fontWeight: '600' }}>START</span>
        </div>

        <div style={{ position: 'absolute', left: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateX(-50%)' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeCount > 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)' }} />
          <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '8px' }}>50% Clear</span>
        </div>

        <div style={{ position: 'absolute', right: '0%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', transform: 'translateY(-4px)', color: activeCount > 0 ? 'var(--neon-green)' : 'var(--text-muted)' }}>🏁</div>
          <span style={{ fontSize: '9px', color: activeCount > 0 ? 'var(--neon-green)' : 'var(--text-muted)', marginTop: '2px', fontWeight: '700' }}>DEBT FREE</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 520px) {
          .timeline-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .timeline-aside {
            text-align: left !important;
            margin-top: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default PayoffTimeline;