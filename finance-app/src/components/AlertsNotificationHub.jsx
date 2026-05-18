import React from 'react';
import { useFinanceData } from '../context/FinanceContext';

const AlertsNotificationHub = () => {
  const { notifications = [] } = useFinanceData() || {};

  if (notifications.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
      {notifications.map((alert) => {
        const isUrgent = alert.type === 'urgent' || alert.type === 'warning';
        return (
          <div 
            key={alert.id} 
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '700',
              fontFamily: 'Space Grotesk',
              background: isUrgent ? 'rgba(231, 76, 60, 0.08)' : 'rgba(0, 255, 170, 0.06)',
              border: `1px solid ${isUrgent ? 'rgba(231, 76, 60, 0.25)' : 'rgba(0, 255, 170, 0.2)'}`,
              color: isUrgent ? '#F39C12' : 'var(--neon-green)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>{isUrgent ? '⚠️' : '⚡'}</span>
            <span style={{ flex: 1 }}>{alert.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AlertsNotificationHub;