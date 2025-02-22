// Conversion rate: 1 USD = 83 INR (approximate)
const USD_TO_INR_RATE = 4;

export function convertToINR(usdAmount: number): number {
  return Math.round(usdAmount * USD_TO_INR_RATE);
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}