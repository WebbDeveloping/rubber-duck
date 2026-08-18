import { BulkDiscountHandler } from './handlers/bulk-discount.handler';
import { CountryFeeHandler } from './handlers/country-fee.handler';
import { PackageAdjustmentHandler } from './handlers/package-adjustment.handler';
import { ShippingCostHandler } from './handlers/shipping-cost.handler';
import { PricingService } from './pricing.service';
import type { PriceContext } from './pricing.types';

function ctx(
  overrides: Partial<PriceContext> & Pick<PriceContext, 'total'>,
): PriceContext {
  return {
    quantity: 10,
    unitPrice: 10,
    packageType: 'Wood',
    country: 'USA',
    shippingMode: 'Land',
    details: [],
    ...overrides,
  };
}

describe('PricingService', () => {
  const service = new PricingService();

  it('qty 100 does not apply bulk discount; qty 101 does', () => {
    const at100 = service.calculate({
      quantity: 100,
      unitPrice: 10,
      packageType: 'Wood',
      destinationCountry: 'USA',
      shippingMode: 'Sea',
    });
    expect(at100.details.some((d) => d.code === 'BULK_DISCOUNT')).toBe(false);

    const at101 = service.calculate({
      quantity: 101,
      unitPrice: 10,
      packageType: 'Wood',
      destinationCountry: 'USA',
      shippingMode: 'Sea',
    });
    expect(at101.details.some((d) => d.code === 'BULK_DISCOUNT')).toBe(true);
    expect(at101.details.find((d) => d.code === 'BULK_DISCOUNT')?.amount).toBe(
      -202,
    );
  });

  it('applies wood +5%, plastic +10%, cardboard −1% on the running total', () => {
    const wood = new PackageAdjustmentHandler();
    const plastic = new PackageAdjustmentHandler();
    const cardboard = new PackageAdjustmentHandler();

    const woodCtx = ctx({ total: 1000, packageType: 'Wood' });
    wood.handle(woodCtx);
    expect(woodCtx.details[0]).toMatchObject({
      code: 'PACKAGE_WOOD',
      amount: 50,
    });
    expect(woodCtx.total).toBe(1050);

    const plasticCtx = ctx({ total: 1000, packageType: 'Plastic' });
    plastic.handle(plasticCtx);
    expect(plasticCtx.details[0]).toMatchObject({
      code: 'PACKAGE_PLASTIC',
      amount: 100,
    });
    expect(plasticCtx.total).toBe(1100);

    const cardCtx = ctx({ total: 1000, packageType: 'Cardboard' });
    cardboard.handle(cardCtx);
    expect(cardCtx.details[0]).toMatchObject({
      code: 'PACKAGE_CARDBOARD',
      amount: -10,
    });
    expect(cardCtx.total).toBe(990);
  });

  it('applies country fees on the running total', () => {
    const handler = new CountryFeeHandler();

    const usa = ctx({ total: 1000, country: 'USA' });
    handler.handle(usa);
    expect(usa.details[0]).toMatchObject({ code: 'COUNTRY_USA', amount: 180 });

    const bolivia = ctx({ total: 1000, country: 'Bolivia' });
    handler.handle(bolivia);
    expect(bolivia.details[0]).toMatchObject({
      code: 'COUNTRY_BOLIVIA',
      amount: 130,
    });

    const india = ctx({ total: 1000, country: 'India' });
    handler.handle(india);
    expect(india.details[0]).toMatchObject({
      code: 'COUNTRY_INDIA',
      amount: 190,
    });

    const other = ctx({ total: 1000, country: 'Other' });
    handler.handle(other);
    expect(other.details[0]).toMatchObject({
      code: 'COUNTRY_OTHER',
      amount: 150,
    });
  });

  it('qty 1000 air has no 15% shipping discount; qty 1001 does', () => {
    const at1000 = service.calculate({
      quantity: 1000,
      unitPrice: 1,
      packageType: 'Wood',
      destinationCountry: 'USA',
      shippingMode: 'Air',
    });
    expect(at1000.details.some((d) => d.code === 'SHIPPING_AIR_DISCOUNT')).toBe(
      false,
    );
    expect(at1000.details.find((d) => d.code === 'SHIPPING_AIR')?.amount).toBe(
      30000,
    );

    const at1001 = service.calculate({
      quantity: 1001,
      unitPrice: 1,
      packageType: 'Wood',
      destinationCountry: 'USA',
      shippingMode: 'Air',
    });
    expect(at1001.details.find((d) => d.code === 'SHIPPING_AIR')?.amount).toBe(
      30030,
    );
    expect(
      at1001.details.find((d) => d.code === 'SHIPPING_AIR_DISCOUNT')?.amount,
    ).toBe(-4504.5);
  });

  it('adds sea $400 and land $10 × quantity', () => {
    const sea = new ShippingCostHandler();
    const seaCtx = ctx({ total: 100, shippingMode: 'Sea', quantity: 5 });
    sea.handle(seaCtx);
    expect(seaCtx.details[0]).toMatchObject({
      code: 'SHIPPING_SEA',
      amount: 400,
    });
    expect(seaCtx.total).toBe(500);

    const land = new ShippingCostHandler();
    const landCtx = ctx({ total: 100, shippingMode: 'Land', quantity: 5 });
    land.handle(landCtx);
    expect(landCtx.details[0]).toMatchObject({
      code: 'SHIPPING_LAND',
      amount: 50,
    });
    expect(landCtx.total).toBe(150);
  });

  it('does not apply bulk discount in isolation when qty is 100', () => {
    const handler = new BulkDiscountHandler();
    const noBulk = ctx({ total: 1000, quantity: 100 });
    handler.handle(noBulk);
    expect(noBulk.details).toEqual([]);
    expect(noBulk.total).toBe(1000);
  });

  it('normalizes country names and runs the full pipeline', () => {
    const result = service.calculate({
      quantity: 150,
      unitPrice: 10,
      packageType: 'Wood',
      destinationCountry: 'usa',
      shippingMode: 'Air',
    });

    expect(result.details).toEqual([
      { code: 'BASE', description: 'quantity × price', amount: 1500 },
      {
        code: 'BULK_DISCOUNT',
        description: '20% off (quantity > 100)',
        amount: -300,
      },
      { code: 'PACKAGE_WOOD', description: 'Wood package +5%', amount: 60 },
      { code: 'COUNTRY_USA', description: 'USA +18%', amount: 226.8 },
      {
        code: 'SHIPPING_AIR',
        description: 'Air shipping $30 × quantity',
        amount: 4500,
      },
    ]);
    expect(result.totalToPay).toBe(5986.8);
  });
});
