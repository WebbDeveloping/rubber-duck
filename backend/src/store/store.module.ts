import { Module } from '@nestjs/common';
import { WarehouseModule } from '../warehouse/ducks.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PackagingService } from './packaging/packaging.service';
import { ProtectionStrategyImpl } from './packaging/protection.strategy';
import { SizeToMaterialStrategyImpl } from './packaging/size-to-material.strategy';
import { PricingService } from './pricing/pricing.service';

@Module({
  imports: [WarehouseModule],
  controllers: [OrdersController],
  providers: [
    SizeToMaterialStrategyImpl,
    ProtectionStrategyImpl,
    PackagingService,
    PricingService,
    OrdersService,
  ],
  exports: [PackagingService, PricingService],
})
export class StoreModule {}
