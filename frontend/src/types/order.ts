import type { DuckColor, DuckSize } from './duck';

export const SHIPPING_MODES = ['Land', 'Air', 'Sea'] as const;
export const ORDER_COUNTRIES = ['USA', 'Bolivia', 'India', 'Other'] as const;

export type ShippingMode = (typeof SHIPPING_MODES)[number];
export type OrderCountry = (typeof ORDER_COUNTRIES)[number];

export type CreateOrderInput = {
  color: DuckColor;
  size: DuckSize;
  quantity: number;
  destinationCountry: string;
  shippingMode: ShippingMode;
  duckId?: number;
};

export type OrderDetail = {
  code: string;
  description: string;
  amount: number;
};

export type OrderQuote = {
  packageType: 'Wood' | 'Cardboard' | 'Plastic';
  protections: string[];
  totalToPay: number;
  details: OrderDetail[];
};
