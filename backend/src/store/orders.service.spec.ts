import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DuckColor, DuckSize } from '@prisma/client';
import { CreateOrderDto, ShippingModeDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { PackagingService } from './packaging/packaging.service';
import { ProtectionStrategyImpl } from './packaging/protection.strategy';
import { SizeToMaterialStrategyImpl } from './packaging/size-to-material.strategy';
import { PricingService } from './pricing/pricing.service';
import type { DuckResponse } from '../warehouse/ducks.service';

describe('OrdersService', () => {
  const duck: DuckResponse = {
    id: 1,
    color: DuckColor.Red,
    size: DuckSize.Large,
    price: 10,
    quantity: 200,
  };

  const ducksService = {
    findActiveByColorAndSize: jest.fn(),
  };

  const service = new OrdersService(
    ducksService as never,
    new PackagingService(
      new SizeToMaterialStrategyImpl(),
      new ProtectionStrategyImpl(),
    ),
    new PricingService(),
  );

  const dto: CreateOrderDto = {
    color: DuckColor.Red,
    size: DuckSize.Large,
    quantity: 150,
    destinationCountry: 'USA',
    shippingMode: ShippingModeDto.Air,
  };

  beforeEach(() => {
    ducksService.findActiveByColorAndSize.mockReset();
  });

  it('returns package, protections, total, and details', async () => {
    ducksService.findActiveByColorAndSize.mockResolvedValue([duck]);

    await expect(service.create(dto)).resolves.toEqual({
      packageType: 'Wood',
      protections: ['Polystyrene balls'],
      totalToPay: 5986.8,
      details: [
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
      ],
    });
  });

  it('returns 404 when no duck matches', async () => {
    ducksService.findActiveByColorAndSize.mockResolvedValue([]);

    await expect(service.create(dto)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('returns 409 when multiple ducks match color and size', async () => {
    ducksService.findActiveByColorAndSize.mockResolvedValue([
      duck,
      { ...duck, id: 2, price: 12 },
    ]);

    await expect(service.create(dto)).rejects.toBeInstanceOf(ConflictException);
  });

  it('uses the selected duck when multiple listings match', async () => {
    ducksService.findActiveByColorAndSize.mockResolvedValue([
      duck,
      { ...duck, id: 2, price: 12, quantity: 80 },
    ]);

    const result = await service.create({ ...dto, duckId: 2, quantity: 10 });

    expect(result.details[0]).toEqual({
      code: 'BASE',
      description: 'quantity × price',
      amount: 120,
    });
  });

  it('returns 400 when duckId does not match color and size', async () => {
    ducksService.findActiveByColorAndSize.mockResolvedValue([duck]);

    await expect(
      service.create({ ...dto, duckId: 99 }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('returns 400 when quantity exceeds stock', async () => {
    ducksService.findActiveByColorAndSize.mockResolvedValue([
      { ...duck, quantity: 10 },
    ]);

    await expect(service.create(dto)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
