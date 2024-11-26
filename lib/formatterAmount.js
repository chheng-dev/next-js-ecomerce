export default class Currency {
  static formatToDollar(amount, currency) {
    if (amount === null || amount === undefined) {
      return '$0.00';
    }

    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numAmount)) {
      throw new Error('Invalid input: Amount must be a number');
    }

    if (currency == 'riel') {
      const amount = numAmount / 4000;
      return `$${amount.toFixed(2)}`;
    }

    return `$${numAmount.toFixed(2)}`;

  }
}
