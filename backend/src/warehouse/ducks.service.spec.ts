import { NotFoundException } from '@nestjs/common';
import { Duck, DuckColor, DuckSize, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DucksService } from './ducks.service';

describe('DucksService', () => {
  const prisma = {
    duck: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const service = new DucksService(prisma as unknown as PrismaService);

  const now = new Date('2026-08-17T00:00:00.000Z');

  function duck(overrides: Partial<Duck> = {}): Duck {
    return {
      id: 1,
      color: DuckColor.Yellow,
      size: DuckSize.Medium,
      price: new Prisma.Decimal('9.99'),
      quantity: 10,
      deleted: false,
      createdAt: now,
      updatedAt: now,
      ...overrides,
    };
  }

  beforeEach(() => {
    prisma.duck.findMany.mockReset();
    prisma.duck.findFirst.mockReset();
    prisma.duck.create.mockReset();
    prisma.duck.update.mockReset();
    prisma.duck.delete.mockReset();
  });

  describe('findAll', () => {
    it('lists non-deleted ducks sorted by quantity ascending', async () => {
      const rows = [
        duck({ id: 2, quantity: 3 }),
        duck({ id: 1, quantity: 10 }),
      ];
      prisma.duck.findMany.mockResolvedValue(rows);

      await expect(service.findAll()).resolves.toEqual([
        {
          id: 2,
          color: DuckColor.Yellow,
          size: DuckSize.Medium,
          price: 9.99,
          quantity: 3,
        },
        {
          id: 1,
          color: DuckColor.Yellow,
          size: DuckSize.Medium,
          price: 9.99,
          quantity: 10,
        },
      ]);

      expect(prisma.duck.findMany).toHaveBeenCalledWith({
        where: { deleted: false },
        orderBy: { quantity: 'asc' },
      });
    });
  });

  describe('findOne', () => {
    it('returns a non-deleted duck', async () => {
      prisma.duck.findFirst.mockResolvedValue(duck());

      await expect(service.findOne(1)).resolves.toMatchObject({
        id: 1,
        price: 9.99,
        quantity: 10,
      });
      expect(prisma.duck.findFirst).toHaveBeenCalledWith({
        where: { id: 1, deleted: false },
      });
    });

    it('throws when the duck is missing or soft-deleted', async () => {
      prisma.duck.findFirst.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('create', () => {
    const dto = {
      color: DuckColor.Red,
      size: DuckSize.Large,
      price: 12.5,
      quantity: 5,
    };

    it('merges quantity when color, size, and price already exist', async () => {
      const existing = duck({
        id: 4,
        color: DuckColor.Red,
        size: DuckSize.Large,
        price: new Prisma.Decimal('12.50'),
        quantity: 8,
      });
      prisma.duck.findFirst.mockResolvedValue(existing);
      prisma.duck.update.mockResolvedValue({ ...existing, quantity: 13 });

      await expect(service.create(dto)).resolves.toMatchObject({
        id: 4,
        quantity: 13,
        price: 12.5,
      });

      expect(prisma.duck.update).toHaveBeenCalledWith({
        where: { id: 4 },
        data: { quantity: 13 },
      });
      expect(prisma.duck.create).not.toHaveBeenCalled();
    });

    it('inserts a new duck when no matching color, size, and price exists', async () => {
      const created = duck({
        id: 7,
        color: DuckColor.Red,
        size: DuckSize.Large,
        price: new Prisma.Decimal('12.50'),
        quantity: 5,
      });
      prisma.duck.findFirst.mockResolvedValue(null);
      prisma.duck.create.mockResolvedValue(created);

      await expect(service.create(dto)).resolves.toMatchObject({
        id: 7,
        color: DuckColor.Red,
        size: DuckSize.Large,
        price: 12.5,
        quantity: 5,
      });

      expect(prisma.duck.create).toHaveBeenCalled();
      expect(prisma.duck.update).not.toHaveBeenCalled();
    });

    it('does not merge into a soft-deleted duck', async () => {
      prisma.duck.findFirst.mockResolvedValue(null);
      prisma.duck.create.mockResolvedValue(
        duck({
          id: 8,
          color: DuckColor.Red,
          size: DuckSize.Large,
          price: new Prisma.Decimal('12.50'),
          quantity: 5,
        }),
      );

      await service.create(dto);

      expect(prisma.duck.findFirst).toHaveBeenCalledWith({
        where: {
          color: dto.color,
          size: dto.size,
          price: expect.any(Prisma.Decimal),
          deleted: false,
        },
      });
      expect(prisma.duck.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('updates only price and quantity', async () => {
      const existing = duck({ id: 3, quantity: 10 });
      prisma.duck.findFirst.mockResolvedValue(existing);
      prisma.duck.update.mockResolvedValue({
        ...existing,
        price: new Prisma.Decimal('11.00'),
        quantity: 20,
      });

      await expect(
        service.update(3, { price: 11, quantity: 20 }),
      ).resolves.toMatchObject({
        id: 3,
        color: DuckColor.Yellow,
        size: DuckSize.Medium,
        price: 11,
        quantity: 20,
      });

      expect(prisma.duck.update).toHaveBeenCalledWith({
        where: { id: 3 },
        data: {
          price: expect.any(Prisma.Decimal),
          quantity: 20,
        },
      });
    });

    it('throws when updating a missing duck', async () => {
      prisma.duck.findFirst.mockResolvedValue(null);

      await expect(service.update(99, { quantity: 1 })).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(prisma.duck.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('soft-deletes by setting deleted to true', async () => {
      prisma.duck.findFirst.mockResolvedValue(duck({ id: 5 }));
      prisma.duck.update.mockResolvedValue(duck({ id: 5, deleted: true }));

      await expect(service.remove(5)).resolves.toBeUndefined();

      expect(prisma.duck.update).toHaveBeenCalledWith({
        where: { id: 5 },
        data: { deleted: true },
      });
      expect(prisma.duck.delete).not.toHaveBeenCalled();
    });

    it('throws when deleting a missing duck', async () => {
      prisma.duck.findFirst.mockResolvedValue(null);

      await expect(service.remove(99)).rejects.toBeInstanceOf(NotFoundException);
      expect(prisma.duck.update).not.toHaveBeenCalled();
    });
  });
});
