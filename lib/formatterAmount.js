export default class Currency {
  static formatToDollar(amount) {

    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount

    if (typeof numAmount !== 'number' || isNaN(numAmount)) {
      throw new Error('Invalid input: Amount must be a number');
    }

    return `$${numAmount.toFixed(2)}`;
  }
}