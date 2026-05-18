import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MasterFinancialDashboard from './pages/MasterFinancialDashboard';
import Strategies from './pages/Strategies';
import Simulations from './pages/Simulations';

// Import your context provider to clear the runtime error
import { FinanceProvider } from './context/FinanceContext'; 

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <FinanceProvider>
      <div style={{ minHeight: '100vh', background: '#050914', color: '#f1f5f9' }}>
        {/* The Navbar component handles the state changes smoothly */}
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        
        {/* Dynamic View Wrapper Container */}
        <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
          {activePage === 'dashboard' && <MasterFinancialDashboard />}
          {activePage === 'strategies' && <Strategies />}
          {activePage === 'simulations' && <Simulations />}
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;