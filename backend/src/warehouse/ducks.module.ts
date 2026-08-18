import { Module } from '@nestjs/common';
import { DucksController } from './ducks.controller';
import { DucksService } from './ducks.service';

@Module({
  controllers: [DucksController],
  providers: [DucksService],
  exports: [DucksService],
})
export class WarehouseModule {}
