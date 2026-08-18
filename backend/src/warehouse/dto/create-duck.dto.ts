import { IsEnum, IsInt, IsNumber, Min } from 'class-validator';
import { DuckColor, DuckSize } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateDuckDto {
  @IsEnum(DuckColor)
  color!: DuckColor;

  @IsEnum(DuckSize)
  size!: DuckSize;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  price!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  quantity!: number;
}
