import { roundMoney } from '../money';
import { PriceHandler } from '../price-handler';
import type { PriceContext } from '../pricing.types';

const PACKAGE_RULES = {
  Wood: { rate: 0.05, code: 'PACKAGE_WOOD', description: 'Wood package +5%' },
  Plastic: {
    rate: 0.1,
    code: 'PACKAGE_PLASTIC',
    description: 'Plastic package +10%',
  },
  Cardboard: {
    rate: -0.01,
    code: 'PACKAGE_CARDBOARD',
    description: 'Cardboard package −1%',
  },
} as const;

export class PackageAdjustmentHandler extends PriceHandler {
  protected apply(ctx: PriceContext): void {
    const rule = PACKAGE_RULES[ctx.packageType];
    const amount = roundMoney(ctx.total * rule.rate);
    ctx.total = roundMoney(ctx.total + amount);
    ctx.details.push({
      code: rule.code,
      description: rule.description,
      amount,
    });
  }
}
