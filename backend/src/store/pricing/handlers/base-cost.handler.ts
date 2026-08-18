import { roundMoney } from '../money';
import { PriceHandler } from '../price-handler';
import type { PriceContext } from '../pricing.types';

export class BaseCostHandler extends PriceHandler {
  protected apply(ctx: PriceContext): void {
    const amount = roundMoney(ctx.quantity * ctx.unitPrice);
    ctx.total = amount;
    ctx.details.push({
      code: 'BASE',
      description: 'quantity × price',
      amount,
    });
  }
}
