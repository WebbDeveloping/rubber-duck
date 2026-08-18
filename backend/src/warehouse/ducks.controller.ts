import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDuckDto } from './dto/create-duck.dto';
import { UpdateDuckDto } from './dto/update-duck.dto';
import { DucksService } from './ducks.service';

@Controller('ducks')
export class DucksController {
  constructor(private readonly ducksService: DucksService) {}

  @Get()
  findAll() {
    return this.ducksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ducksService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDuckDto) {
    return this.ducksService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDuckDto,
  ) {
    return this.ducksService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ducksService.remove(id);
  }
}
