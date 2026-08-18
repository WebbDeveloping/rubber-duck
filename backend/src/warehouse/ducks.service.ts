import { Injectable, NotFoundException } from '@nestjs/common';
import { Duck, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDuckDto } from './dto/create-duck.dto';
import { UpdateDuckDto } from './dto/update-duck.dto';

export type DuckResponse = {
  id: number;
  color: Duck['color'];
  size: Duck['size'];
  price: number;
  quantity: number;
};

@Injectable()
export class DucksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<DuckResponse[]> {
    const ducks = await this.prisma.duck.findMany({
      where: { deleted: false },
      orderBy: { quantity: 'asc' },
    });

    return ducks.map((duck) => this.toResponse(duck));
  }

  async findOne(id: number): Promise<DuckResponse> {
    const duck = await this.prisma.duck.findFirst({
      where: { id, deleted: false },
    });

    if (!duck) {
      throw new NotFoundException(`Duck ${id} not found`);
    }

    return this.toResponse(duck);
  }

  async findActiveByColorAndSize(
    color: Duck['color'],
    size: Duck['size'],
  ): Promise<DuckResponse[]> {
    const ducks = await this.prisma.duck.findMany({
      where: { color, size, deleted: false },
      orderBy: { quantity: 'desc' },
    });

    return ducks.map((duck) => this.toResponse(duck));
  }

  async create(dto: CreateDuckDto): Promise<DuckResponse> {
    const price = new Prisma.Decimal(dto.price);

    const existing = await this.prisma.duck.findFirst({
      where: {
        color: dto.color,
        size: dto.size,
        price,
        deleted: false,
      },
    });

    if (existing) {
      const updated = await this.prisma.duck.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + dto.quantity },
      });
      return this.toResponse(updated);
    }

    const created = await this.prisma.duck.create({
      data: {
        color: dto.color,
        size: dto.size,
        price,
        quantity: dto.quantity,
      },
    });

    return this.toResponse(created);
  }

  async update(id: number, dto: UpdateDuckDto): Promise<DuckResponse> {
    await this.findOne(id);

    const data: Prisma.DuckUpdateInput = {};
    if (dto.price !== undefined) {
      data.price = new Prisma.Decimal(dto.price);
    }
    if (dto.quantity !== undefined) {
      data.quantity = dto.quantity;
    }

    const updated = await this.prisma.duck.update({
      where: { id },
      data,
    });

    return this.toResponse(updated);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.prisma.duck.update({
      where: { id },
      data: { deleted: true },
    });
  }

  private toResponse(duck: Duck): DuckResponse {
    return {
      id: duck.id,
      color: duck.color,
      size: duck.size,
      price: Number(duck.price),
      quantity: duck.quantity,
    };
  }
}
