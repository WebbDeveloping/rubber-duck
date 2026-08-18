import { DuckColor, DuckSize } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export enum ShippingModeDto {
  Land = 'Land',
  Air = 'Air',
  Sea = 'Sea',
}

export class CreateOrderDto {
  @IsEnum(DuckColor)
  color!: DuckColor;

  @IsEnum(DuckSize)
  size!: DuckSize;

  @Transform(({ value }: { value: unknown }) => Number(value))
  @IsInt()
  @Min(1)
  quantity!: number;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @MinLength(1)
  destinationCountry!: string;

  @IsEnum(ShippingModeDto)
  shippingMode!: ShippingModeDto;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    value === undefined || value === null || value === '' ? undefined : Number(value),
  )
  @IsInt()
  @Min(1)
  duckId?: number;
}
