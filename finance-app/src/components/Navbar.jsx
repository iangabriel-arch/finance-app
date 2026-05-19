import React, { useState, useEffect } from 'react';
import { useFinanceData } from '../context/FinanceContext';
import { UserButton } from '@clerk/clerk-react';

const Navbar = ({ activePage, setActivePage }) => {
  const { compactNotation, setCompactNotation } = useFinanceData();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
      if (window.innerWidth >= 850) setMenuOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isMobile ? '16px 20px' : '20px 40px',
    background: '#070b19',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    position: 'relative',
    zIndex: 1000,
    fontFamily: '"Plus Jakarta Sans", sans-serif'
  };

  const logoStyle = {
    fontSize: '18px',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '1px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  };

  const desktopMenuStyle = { display: 'flex', gap: '28px', alignItems: 'center' };

  const navLinkStyle = (isActive) => ({
    background: 'transparent',
    border: 'none',
    color: isActive ? '#22d3ee' : '#64748b',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '8px 4px',
    transition: 'all 0.2s ease',
    borderBottom: isActive ? '2px solid #22d3ee' : '2px solid transparent'
  });

  const toggleBtnStyle = {
    background: compactNotation ? 'rgba(34, 211, 238, 0.12)' : 'rgba(255, 255, 255, 0.03)',
    border: compactNotation ? '1px solid rgba(34, 211, 238, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
    color: compactNotation ? '#22d3ee' : '#64748b',
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const mobileMenuOverlayStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    background: 'rgba(7, 11, 25, 0.98)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: menuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    padding: '16px 0',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    zIndex: 999
  };

  const mobileNavLinkStyle = (isActive) => ({
    background: isActive ? 'rgba(34, 211, 238, 0.05)' : 'transparent',
    border: 'none',
    color: isActive ? '#22d3ee' : '#94a3b8',
    padding: '16px 24px',
    textAlign: 'left',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    borderLeft: isActive ? '4px solid #22d3ee' : '4px solid transparent',
  });

  return (
    <nav style={navContainerStyle}>
      <div style={logoStyle} onClick={() => setActivePage('dashboard')}>
        <div style={{ width: '10px', height: '10px', background: '#22d3ee', borderRadius: '3px' }} />
        SPENDIFY
      </div>

      {/* DESKTOP VIEW */}
      {!isMobile && (
        <div style={desktopMenuStyle}>
          <button style={navLinkStyle(activePage === 'dashboard')} onClick={() => setActivePage('dashboard')}>Command Center</button>
          <button style={navLinkStyle(activePage === 'strategies')} onClick={() => setActivePage('strategies')}>Strategies</button>
          <button style={navLinkStyle(activePage === 'simulations')} onClick={() => setActivePage('simulations')}>Simulations</button>
          <button style={toggleBtnStyle} onClick={() => setCompactNotation(!compactNotation)}>
            👁️ {compactNotation ? 'COMPACT ON' : 'FULL VIEW'}
          </button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}

      {/* MOBILE VIEW */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={toggleBtnStyle} onClick={() => setCompactNotation(!compactNotation)}>
            👁️ {compactNotation ? 'COMPACT' : 'FULL'}
          </button>
          <UserButton afterSignOutUrl="/" />
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '22px', height: '16px', padding: 0 }} onClick={() => setMenuOpen(!menuOpen)}>
            <div style={{ width: '100%', height: '2px', background: '#22d3ee', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ width: '100%', height: '2px', background: '#22d3ee', borderRadius: '2px', opacity: menuOpen ? 0 : 1, transition: 'all 0.2s' }} />
            <div style={{ width: '100%', height: '2px', background: '#22d3ee', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      )}

      {isMobile && (
        <div style={mobileMenuOverlayStyle}>
          <button style={mobileNavLinkStyle(activePage === 'dashboard')} onClick={() => { setActivePage('dashboard'); setMenuOpen(false); }}>📊 Command Center</button>
          <button style={mobileNavLinkStyle(activePage === 'strategies')} onClick={() => { setActivePage('strategies'); setMenuOpen(false); }}>⚡ Strategies</button>
          <button style={mobileNavLinkStyle(activePage === 'simulations')} onClick={() => { setActivePage('simulations'); setMenuOpen(false); }}>📈 Simulations</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;