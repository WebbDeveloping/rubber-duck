import type { PackageType, ShippingMode } from '../packaging/packaging.types';
import type { PricedCountry } from './country';

export type PriceDetail = {
  code: string;
  description: string;
  amount: number;
};

export type PriceContext = {
  quantity: number;
  unitPrice: number;
  packageType: PackageType;
  country: PricedCountry;
  shippingMode: ShippingMode;
  total: number;
  details: PriceDetail[];
};

export type PricingInput = {
  quantity: number;
  unitPrice: number;
  packageType: PackageType;
  destinationCountry: string;
  shippingMode: ShippingMode;
};

export type PricingResult = {
  totalToPay: number;
  details: PriceDetail[];
};
