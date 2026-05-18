export const calculatePayoff = (debts, monthlyExtra, strategy = 'avalanche') => {
  if (!debts.length) return { totalInterest: 0, months: 0, payoffOrder: [] };

  // Sort based on strategy
  const sortedDebts = [...debts].sort((a, b) => {
    if (strategy === 'avalanche') {
      return b.interestRate - a.interestRate; // High interest first
    }
    return a.balance - b.balance; // Smallest balance first (Snowball)
  });

  // Simplified projection (can be made more complex later)
  let totalInterest = 0;
  let maxMonths = 0;
  
  sortedDebts.forEach(debt => {
    const monthlyRate = (debt.interestRate / 100) / 12;
    // Basic approximation of months to payoff
    const months = Math.ceil(debt.balance / (debt.minPayment + monthlyExtra / debts.length));
    totalInterest += (debt.balance * monthlyRate * (months / 2));
    if (months > maxMonths) maxMonths = months;
  });

  return {
    totalInterest,
    months: maxMonths,
    payoffOrder: sortedDebts
  };
};