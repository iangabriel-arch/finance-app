import React from 'react';

const ProgressRing = ({ 
  percentage = 0, 
  size = 120, 
  strokeWidth = 10, 
  color = '#27AE60', 
  label = '', 
  sublabel = '' 
}) => {
  const cleanPercent = Math.min(100, Math.max(0, percentage));
  const radius = (size / 2) - strokeWidth;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (cleanPercent / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '0 8px', boxSizing: 'border-box', textAlign: 'center' }}>
        <span style={{ fontSize: size * 0.14, fontWeight: '700', color: '#fff', fontFamily: 'Space Grotesk', lineHeight: 1.1 }}>
          {label}
        </span>
        {sublabel && (
          <span style={{ fontSize: size * 0.08, color: 'var(--text-muted)', marginTop: '2px', fontWeight: '500' }}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;