import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DucksService } from '../warehouse/ducks.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PackagingService } from './packaging/packaging.service';
import { PricingService } from './pricing/pricing.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ducksService: DucksService,
    private readonly packagingService: PackagingService,
    private readonly pricingService: PricingService,
  ) {}

  async create(dto: CreateOrderDto) {
    const matches = await this.ducksService.findActiveByColorAndSize(
      dto.color,
      dto.size,
    );

    if (matches.length === 0) {
      throw new NotFoundException(`No duck found for ${dto.color} ${dto.size}`);
    }

    const duck = dto.duckId
      ? matches.find((item) => item.id === dto.duckId)
      : matches.length === 1
        ? matches[0]
        : undefined;

    if (dto.duckId && !duck) {
      throw new BadRequestException(
        `Duck ${dto.duckId} does not match ${dto.color} ${dto.size}`,
      );
    }

    if (!duck) {
      throw new ConflictException(
        `Multiple ducks found for ${dto.color} ${dto.size}`,
      );
    }
    if (dto.quantity > duck.quantity) {
      throw new BadRequestException('insufficient stock');
    }

    const packaging = this.packagingService.resolve(dto.size, dto.shippingMode);
    const pricing = this.pricingService.calculate({
      quantity: dto.quantity,
      unitPrice: duck.price,
      packageType: packaging.packageType,
      destinationCountry: dto.destinationCountry,
      shippingMode: dto.shippingMode,
    });

    return {
      packageType: packaging.packageType,
      protections: packaging.protections,
      totalToPay: pricing.totalToPay,
      details: pricing.details,
    };
  }
}
