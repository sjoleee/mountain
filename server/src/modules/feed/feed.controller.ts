import { UserDto } from './../user/dto/user.dto';
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
import { FeedEnum } from './schemas/feedtype.enum';
import { Types } from 'mongoose';

@ApiTags('feeds')
@Controller('feeds')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiOperation({ summary: '현재 로그인되어있는 유저가 피드작성' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async create(
    @CurrentUser() currentUser: UserDto,
    @Body() createFeedDto: CreateFeedDto,
  ) {
    const createQuery = {
      ...createFeedDto,
      author: currentUser._id,
      type: FeedEnum.User,
    };
    const result = await this.feedService.createFeed(createQuery);
    return new ResponseStatusDto(result);
  }

  @ApiOperation({ summary: '피드 전부 가져오기(댓글까지)' })
  @ApiQuery({ name: 'author', required: false, type: String })
  @Get()
  async findAll(@Query('author') author: string) {
    if (author) {
      const query = { author: new Types.ObjectId(author) };
      const feeds = await this.feedService.findAllWithQuery(query);
      return feeds.map((feed) => new ResponseFeedDto(feed));
    }
    const feeds = await this.feedService.findAll();
    return feeds.map((feed) => new ResponseFeedDto(feed));
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

  @ApiOperation({ summary: '미완성' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
function ApiImplicitQuery(arg0: {
  name: string;
  required: boolean;
  type: StringConstructor;
}) {
  throw new Error('Function not implemented.');
}
