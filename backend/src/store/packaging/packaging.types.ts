import { DuckSize } from '@prisma/client';

export type PackageType = 'Wood' | 'Cardboard' | 'Plastic';

export type Protection =
  'Polystyrene balls' | 'Bubble wrap bags' | 'Moisture-absorbing beads';

export type ShippingMode = 'Land' | 'Air' | 'Sea';

export type PackagingResult = {
  packageType: PackageType;
  protections: Protection[];
};

export interface SizeToMaterialStrategy {
  resolve(size: DuckSize): PackageType;
}

export interface ProtectionStrategy {
  resolve(shippingMode: ShippingMode, packageType: PackageType): Protection[];
}
