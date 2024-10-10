export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') {
    throw new Error('Amount must be a number');
  }

  return `$${amount.toFixed(2)}`;
}