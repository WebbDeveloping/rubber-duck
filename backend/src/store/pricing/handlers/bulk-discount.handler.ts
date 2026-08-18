import { roundMoney } from '../money';
import { PriceHandler } from '../price-handler';
import type { PriceContext } from '../pricing.types';

export class BulkDiscountHandler extends PriceHandler {
  protected apply(ctx: PriceContext): void {
    if (ctx.quantity <= 100) {
      return;
    }

    const amount = roundMoney(-ctx.total * 0.2);
    ctx.total = roundMoney(ctx.total + amount);
    ctx.details.push({
      code: 'BULK_DISCOUNT',
      description: '20% off (quantity > 100)',
      amount,
    });
  }
}
