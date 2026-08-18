import { roundMoney } from '../money';
import { PriceHandler } from '../price-handler';
import type { PriceContext } from '../pricing.types';

export class ShippingCostHandler extends PriceHandler {
  protected apply(ctx: PriceContext): void {
    switch (ctx.shippingMode) {
      case 'Sea':
        this.add(ctx, 'SHIPPING_SEA', 'Sea shipping +$400', 400);
        return;
      case 'Land':
        this.add(
          ctx,
          'SHIPPING_LAND',
          'Land shipping $10 × quantity',
          ctx.quantity * 10,
        );
        return;
      case 'Air': {
        // Air = $30 × qty; if qty > 1000, subtract 15% of that air charge only.
        const airShipping = ctx.quantity * 30;
        this.add(
          ctx,
          'SHIPPING_AIR',
          'Air shipping $30 × quantity',
          airShipping,
        );
        if (ctx.quantity > 1000) {
          this.add(
            ctx,
            'SHIPPING_AIR_DISCOUNT',
            '15% off air shipping (quantity > 1000)',
            -airShipping * 0.15,
          );
        }
      }
    }
  }

  private add(
    ctx: PriceContext,
    code: string,
    description: string,
    rawAmount: number,
  ): void {
    const amount = roundMoney(rawAmount);
    ctx.total = roundMoney(ctx.total + amount);
    ctx.details.push({ code, description, amount });
  }
}
