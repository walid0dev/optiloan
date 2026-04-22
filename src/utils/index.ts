import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const currencyFormatter = new Intl.NumberFormat("fr-MA", {
  style: 'currency',
  currency: 'MAD',
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}