import { useMemo } from 'react';

export const useFinance = (debts = [], monthlyExtra = 0, savingsConfig = { initial: 0, monthly: 0 }) => {
  
  const financeData = useMemo(() => {
    // 1. Safety Check: Sanitize numeric inputs to avoid KES NaN errors
    const sanitize = (val) => isNaN(parseFloat(val)) ? 0 : parseFloat(val);

    const calculatePayoff = (strategy) => {
      let localDebts = debts.map(d => ({
        ...d,
        currentBalance: sanitize(d.balance),
        rate: sanitize(d.interestRate) / 100 / 12,
        min: sanitize(d.minPayment)
      }));

      let totalInterest = 0;
      let months = 0;
      let projection = [];

      // Strategy Sorting: Avalanche (High Rate) vs Snowball (Low Balance)
      localDebts.sort((a, b) => strategy === 'avalanche' ? b.rate - a.rate : a.currentBalance - b.currentBalance);

      while (localDebts.some(d => d.currentBalance > 0) && months < 360) {
        months++;
        let extra = sanitize(monthlyExtra);
        let monthlyTotalDebt = 0;

        localDebts.forEach(debt => {
          if (debt.currentBalance > 0) {
            const interest = debt.currentBalance * debt.rate;
            totalInterest += interest;
            debt.currentBalance += interest;
            
            const payment = Math.min(debt.currentBalance, debt.min);
            debt.currentBalance -= payment;
            monthlyTotalDebt += debt.currentBalance;
          }
        });

        // Apply Extra to priority debt
        for (let d of localDebts) {
          if (d.currentBalance > 0) {
            const extraPay = Math.min(d.currentBalance, extra);
            d.currentBalance -= extraPay;
            extra -= extraPay;
            if (extra <= 0) break;
          }
        }
        projection.push(monthlyTotalDebt);
      }
      return { totalInterest, months, projection };
    };

    // 2. Savings Projection (Task 2)
    const generateChartData = () => {
      const snowball = calculatePayoff('snowball');
      const avalanche = calculatePayoff('avalanche');
      
      let currentSavings = sanitize(savingsConfig.initial);
      const monthlyRate = 0.07 / 12; // 7% Annual

      return Array.from({ length: 12 }, (_, i) => {
        currentSavings += sanitize(savingsConfig.monthly) + (currentSavings * monthlyRate);
        return {
          name: new Date(2026, i, 1).toLocaleString('default', { month: 'short' }),
          debt: Math.round(snowball.projection[i] || 0),
          savings: Math.round(currentSavings)
        };
      });
    };

    return {
      snowball: calculatePayoff('snowball'),
      avalanche: calculatePayoff('avalanche'),
      chartData: generateChartData()
    };
  }, [debts, monthlyExtra, savingsConfig]);

  return financeData;
};