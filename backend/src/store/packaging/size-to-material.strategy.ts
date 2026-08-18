import { Injectable } from '@nestjs/common';
import { DuckSize } from '@prisma/client';
import type { PackageType, SizeToMaterialStrategy } from './packaging.types';

@Injectable()
export class SizeToMaterialStrategyImpl implements SizeToMaterialStrategy {
  resolve(size: DuckSize): PackageType {
    switch (size) {
      case DuckSize.XLarge:
      case DuckSize.Large:
        return 'Wood';
      case DuckSize.Medium:
        return 'Cardboard';
      case DuckSize.Small:
      case DuckSize.XSmall:
        return 'Plastic';
    }
  }
}
