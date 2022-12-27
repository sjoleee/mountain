import { FeedDto } from './dto/feed.dto';
import { ResponseStatusDto } from './../../common/dto/response-status';
import { ResponseFeedDto } from './dto/response-feed.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedService } from './services/feed.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Types } from 'mongoose';
import { UsersDto } from '../users/dto/users.dto';
import { FeedEnum } from 'src/common/enums/feedtype.enum';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { FilterFeedOptionsDto } from './dto/filter-feed-options.dto';
import { FilterAdminFeedOptionsDto } from './dto/filter-admin-feed-options.dto';

@ApiTags('admin')
@Controller('admin/feeds')
export class AdminFeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiOperation({ summary: '피드 전부 가져오기(댓글+유저정보까지)' })
  @Get()
  async findPage(
    @Query() filter: FilterAdminFeedOptionsDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FeedDto>> {
    return await this.feedService.findPageAdmin(filter, pageOptionsDto);
  }

  @ApiOperation({ summary: 'id로 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return this.feedService.remove(id);
  }
}
