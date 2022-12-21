import { ResponseStatusDto } from './../../common/dto/response-status';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BadgesService } from './badges.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { ResponseBadgeDto } from './dto/response-badge.dto copy';
import { UpdateBadgeDto } from './dto/update-badge.dto';

@ApiTags('badges')
@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}
  @ApiOperation({ summary: '뱃지 추가' })
  @Post()
  async create(
    @Body() createBadgeDto: CreateBadgeDto,
  ): Promise<ResponseStatusDto> {
    return await this.badgesService.create(createBadgeDto);
  }

  @ApiOperation({ summary: '뱃지 전부 보기' })
  @Get()
  async findAll(): Promise<ResponseBadgeDto[]> {
    return await this.badgesService.findAll();
  }
  @ApiOperation({ summary: '한 뱃지 보기' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseBadgeDto> {
    return await this.badgesService.findOne(id);
  }
  @ApiOperation({ summary: '뱃지 수정' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBadgeDto: UpdateBadgeDto,
  ): Promise<ResponseStatusDto> {
    return await this.badgesService.update(id, updateBadgeDto);
  }
  @ApiOperation({ summary: '뱃지 삭제' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return await this.badgesService.remove(id);
  }
}
