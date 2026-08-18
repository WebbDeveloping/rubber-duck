import { Injectable } from '@nestjs/common';
import type {
  PackageType,
  Protection,
  ProtectionStrategy,
  ShippingMode,
} from './packaging.types';

@Injectable()
export class ProtectionStrategyImpl implements ProtectionStrategy {
  resolve(shippingMode: ShippingMode, packageType: PackageType): Protection[] {
    switch (shippingMode) {
      case 'Air':
        return packageType === 'Plastic'
          ? ['Bubble wrap bags']
          : ['Polystyrene balls'];
      case 'Land':
        return ['Polystyrene balls'];
      case 'Sea':
        return ['Moisture-absorbing beads', 'Bubble wrap bags'];
    }
  }
}
