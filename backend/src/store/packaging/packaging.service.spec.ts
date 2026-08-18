import { DuckSize } from '@prisma/client';
import { PackagingService } from './packaging.service';
import { ProtectionStrategyImpl } from './protection.strategy';
import { SizeToMaterialStrategyImpl } from './size-to-material.strategy';

describe('PackagingService', () => {
  const service = new PackagingService(
    new SizeToMaterialStrategyImpl(),
    new ProtectionStrategyImpl(),
  );

  it('Large + Air → Wood + polystyrene balls', () => {
    expect(service.resolve(DuckSize.Large, 'Air')).toEqual({
      packageType: 'Wood',
      protections: ['Polystyrene balls'],
    });
  });

  it('Small + Air → Plastic + bubble wrap bags', () => {
    expect(service.resolve(DuckSize.Small, 'Air')).toEqual({
      packageType: 'Plastic',
      protections: ['Bubble wrap bags'],
    });
  });

  it('Medium + Land → Cardboard + polystyrene balls', () => {
    expect(service.resolve(DuckSize.Medium, 'Land')).toEqual({
      packageType: 'Cardboard',
      protections: ['Polystyrene balls'],
    });
  });

  it('XSmall + Sea → Plastic + beads and bubble wrap', () => {
    expect(service.resolve(DuckSize.XSmall, 'Sea')).toEqual({
      packageType: 'Plastic',
      protections: ['Moisture-absorbing beads', 'Bubble wrap bags'],
    });
  });

  it('XLarge + Land → Wood + polystyrene balls', () => {
    expect(service.resolve(DuckSize.XLarge, 'Land')).toEqual({
      packageType: 'Wood',
      protections: ['Polystyrene balls'],
    });
  });

  it('Medium + Air → Cardboard + polystyrene balls', () => {
    expect(service.resolve(DuckSize.Medium, 'Air')).toEqual({
      packageType: 'Cardboard',
      protections: ['Polystyrene balls'],
    });
  });

  it('XLarge + Sea → Wood + beads and bubble wrap', () => {
    expect(service.resolve(DuckSize.XLarge, 'Sea')).toEqual({
      packageType: 'Wood',
      protections: ['Moisture-absorbing beads', 'Bubble wrap bags'],
    });
  });
});
