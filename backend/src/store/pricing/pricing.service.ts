import { Injectable } from '@nestjs/common';
import { normalizeCountry } from './country';
import { BaseCostHandler } from './handlers/base-cost.handler';
import { BulkDiscountHandler } from './handlers/bulk-discount.handler';
import { CountryFeeHandler } from './handlers/country-fee.handler';
import { PackageAdjustmentHandler } from './handlers/package-adjustment.handler';
import { ShippingCostHandler } from './handlers/shipping-cost.handler';
import { PriceHandler } from './price-handler';
import type {
  PriceContext,
  PricingInput,
  PricingResult,
} from './pricing.types';

@Injectable()
export class PricingService {
  private readonly chain: PriceHandler;

  constructor() {
    const base = new BaseCostHandler();
    base
      .setNext(new BulkDiscountHandler())
      .setNext(new PackageAdjustmentHandler())
      .setNext(new CountryFeeHandler())
      .setNext(new ShippingCostHandler());
    this.chain = base;
  }

  calculate(input: PricingInput): PricingResult {
    const ctx: PriceContext = {
      quantity: input.quantity,
      unitPrice: input.unitPrice,
      packageType: input.packageType,
      country: normalizeCountry(input.destinationCountry),
      shippingMode: input.shippingMode,
      total: 0,
      details: [],
    };

    this.chain.handle(ctx);

    return {
      totalToPay: ctx.total,
      details: ctx.details,
    };
  }
}
