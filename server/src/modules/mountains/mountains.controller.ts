import { ResponseMountainsDto } from './dto/response-mountains.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MountainsService } from './mountains.service';
import { CreateMountainDto } from './dto/create-mountain.dto';
import { UpdateMountainDto } from './dto/update-mountain.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseStatusDto } from 'src/common/dto/response-status';

@ApiTags('mountains')
@Controller('mountains')
export class MountainsController {
  constructor(private readonly mountainsService: MountainsService) {}
  @ApiOperation({ summary: '산 추가' })
  @Post()
  async create(
    @Body() createMountainDto: CreateMountainDto,
  ): Promise<ResponseStatusDto> {
    return await this.mountainsService.create(createMountainDto);
  }

  @ApiOperation({ summary: '산 전부 보기' })
  @Get()
  async findAll(): Promise<ResponseMountainsDto[]> {
    return await this.mountainsService.findAll();
  }

  @ApiOperation({ summary: '산 아이디로 보기' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseMountainsDto> {
    return await this.mountainsService.findOne(id);
  }
  @ApiOperation({ summary: '산 수정' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMountainDto: UpdateMountainDto,
  ): Promise<ResponseStatusDto> {
    return await this.mountainsService.update(id, updateMountainDto);
  }
  @ApiOperation({ summary: '산 삭제' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return await this.mountainsService.remove(id);
  }
}
