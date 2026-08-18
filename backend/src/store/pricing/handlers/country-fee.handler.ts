import { roundMoney } from '../money';
import { PriceHandler } from '../price-handler';
import type { PriceContext } from '../pricing.types';

const COUNTRY_RULES = {
  USA: { rate: 0.18, code: 'COUNTRY_USA', description: 'USA +18%' },
  Bolivia: { rate: 0.13, code: 'COUNTRY_BOLIVIA', description: 'Bolivia +13%' },
  India: { rate: 0.19, code: 'COUNTRY_INDIA', description: 'India +19%' },
  Other: {
    rate: 0.15,
    code: 'COUNTRY_OTHER',
    description: 'Other country +15%',
  },
} as const;

export class CountryFeeHandler extends PriceHandler {
  protected apply(ctx: PriceContext): void {
    const rule = COUNTRY_RULES[ctx.country];
    const amount = roundMoney(ctx.total * rule.rate);
    ctx.total = roundMoney(ctx.total + amount);
    ctx.details.push({
      code: rule.code,
      description: rule.description,
      amount,
    });
  }
}
