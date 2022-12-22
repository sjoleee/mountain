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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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

@ApiTags('feeds')
@Controller('feeds')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiOperation({ summary: '현재 로그인되어있는 유저가 피드작성' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async create(
    @CurrentUser() currentUser: UsersDto,
    @Body() createFeedDto: CreateFeedDto,
  ) {
    const result = await this.feedService.createFeed(
      currentUser,
      createFeedDto,
    );
    return new ResponseStatusDto(result);
  }

  // @ApiOperation({ summary: '지우기 전 백업용 api(안씀)' })
  // @ApiQuery({ name: 'author', required: false, type: String })
  // @Get('/old/all')
  // async findAll(@Query('author') author: string) {
  //   if (author) {
  //     const query = { author: new Types.ObjectId(author) };
  //     const feeds = await this.feedService.findAllWithQuery(query);
  //     return feeds.map((feed) => new ResponseFeedDto(feed));
  //   }
  //   const feeds = await this.feedService.findAll();
  //   return feeds.map((feed) => new ResponseFeedDto(feed));
  // }

  @ApiOperation({ summary: '피드 전부 가져오기(댓글+유저정보까지)' })
  @Get()
  async findPage(
    @Query() filter: FilterFeedOptionsDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FeedDto>> {
    return await this.feedService.findPage(filter, pageOptionsDto);
  }

  @ApiOperation({ summary: '해당 피드 가져오기' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const feed = await this.feedService.findOneById(id);
    return new ResponseFeedDto(feed);
  }

  @ApiOperation({ summary: '미완성' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedDto: UpdateFeedDto) {
    return this.feedService.update(+id, updateFeedDto);
  }

  @ApiOperation({ summary: 'id로 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return this.feedService.remove(id);
  }
}
