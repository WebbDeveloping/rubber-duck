import type { DuckSize } from '../types/duck';

export const SIZE_PILL: Record<DuckSize, string> = {
  XSmall: 'XS',
  Small: 'S',
  Medium: 'M',
  Large: 'L',
  XLarge: 'XL',
};

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function sizeLabel(size: string) {
  return size.replace(/([a-z])([A-Z])/g, '$1 $2');
}
