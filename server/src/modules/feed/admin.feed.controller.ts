import { FeedDto } from './dto/feed.dto';
import { ResponseStatusDto } from './../../common/dto/response-status';
import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeedService } from './services/feed.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { FilterAdminFeedOptionsDto } from './dto/filter-admin-feed-options.dto';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';

@ApiTags('admin')
@Controller('admin/feeds')
export class AdminFeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiOperation({ summary: '피드 전부 가져오기(댓글+유저정보까지)' })
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findPage(
    @Query() filter: FilterAdminFeedOptionsDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FeedDto>> {
    return await this.feedService.findPageAdmin(filter, pageOptionsDto);
  }

  @ApiOperation({ summary: 'id로 삭제' })
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return this.feedService.remove(id);
  }
}
