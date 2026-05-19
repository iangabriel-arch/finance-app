import React, { useState } from 'react';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import MasterFinancialDashboard from './pages/MasterFinancialDashboard';
import Strategies from './pages/Strategies';
import Simulations from './pages/Simulations';
import { FinanceProvider } from './context/FinanceContext';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <>
      {/* If user is NOT logged in, show the login page */}
      <SignedOut>
        <div style={{
          minHeight: '100vh',
          background: '#050914',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px'
        }}>
          <h1 style={{ color: '#f1f5f9', fontSize: '2rem', fontWeight: 'bold' }}>
            💰 Finance App
          </h1>
          <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
            Sign in to access your personal finance dashboard
          </p>
          <SignIn routing="hash" />
        </div>
      </SignedOut>

      {/* If user IS logged in, show the actual app */}
      <SignedIn>
        <FinanceProvider>
          <div style={{ minHeight: '100vh', background: '#050914', color: '#f1f5f9' }}>
            <Navbar activePage={activePage} setActivePage={setActivePage} />
            <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
              {activePage === 'dashboard' && <MasterFinancialDashboard />}
              {activePage === 'strategies' && <Strategies />}
              {activePage === 'simulations' && <Simulations />}
            </main>
          </div>
        </FinanceProvider>
      </SignedIn>
    </>
  );
}

export default App;