import { Injectable } from '@nestjs/common';
import { DuckSize } from '@prisma/client';
import { ProtectionStrategyImpl } from './protection.strategy';
import { SizeToMaterialStrategyImpl } from './size-to-material.strategy';
import type { PackagingResult, ShippingMode } from './packaging.types';

@Injectable()
export class PackagingService {
  constructor(
    private readonly sizeToMaterial: SizeToMaterialStrategyImpl,
    private readonly protection: ProtectionStrategyImpl,
  ) {}

  resolve(size: DuckSize, shippingMode: ShippingMode): PackagingResult {
    const packageType = this.sizeToMaterial.resolve(size);
    const protections = this.protection.resolve(shippingMode, packageType);
    return { packageType, protections };
  }
}
