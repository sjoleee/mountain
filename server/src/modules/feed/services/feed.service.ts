import { ChallengesRepository } from './../../challenges/challenges.repository';
import { PageDto } from './../../../common/dto/page.dto';
import { FeedRepository } from './../feed.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedDto } from '../dto/create-feed.dto';
import { UpdateFeedDto } from '../dto/update-feed.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { FilterFeedOptionsDto } from '../dto/filter-feed-options.dto';
import { Types } from 'mongoose';
import { UsersDto } from 'src/modules/users/dto/users.dto';
import { FeedEnum } from 'src/common/enums/feedtype.enum';
import { FilterAdminFeedOptionsDto } from '../dto/filter-admin-feed-options.dto';

@Injectable()
export class FeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly challengesRepository: ChallengesRepository,
  ) {}

  async createFeed(currentUser: UsersDto, createFeedDto: CreateFeedDto) {
    const createField = {
      ...createFeedDto,
      author: currentUser._id,
      type: FeedEnum.User,
    };
    const newFeed = await this.feedRepository.createFeed(createField);
    if (!newFeed) {
      throw new NotFoundException({
        status: 404,
        message: '생성에 실패했습니다 ',
      });
    }
    return { status: 201, message: 'success' };
  }
  async createChallengeFeed(
    id: string,
    currentUser: UsersDto,
    createFeedDto: CreateFeedDto,
  ) {
    const createField = {
      ...createFeedDto,
      author: currentUser._id,
      type: FeedEnum.Challenge,
    };
    const newFeed = await this.feedRepository.createFeed(createField);
    if (!newFeed) {
      throw new NotFoundException({
        status: 404,
        message: '생성에 실패했습니다 ',
      });
    }
    const body = {
      approval: newFeed._id,
    };

    const result = await this.challengesRepository.updateById(id, body);
    console.log(result);
    return { status: 201, message: 'success' };
  }
  async findAll() {
    return await this.feedRepository.findAll();
  }
  async findAllWithQuery(query) {
    return await this.feedRepository.findAllWithQuery(query);
  }

  async findPage(
    filterFeed: FilterFeedOptionsDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const filter = {};
    if (filterFeed.author) {
      filter['author'] = new Types.ObjectId(filterFeed.author);
    }
    if (filterFeed.tag) {
      filter['tag'] = { $in: filterFeed.tag };
    }
    if (filterFeed.pos) {
      filter['lat'] = { $exists: true };
      filter['lng'] = { $exists: true };
    }
    const sort = {};
    if (filterFeed.like) {
      sort['likes'] = 'desc';
    } else if (pageOptionsDto.order) {
      sort['createdAt'] = pageOptionsDto.order;
    }
    const [itemCount, feeds] = await Promise.all([
      this.feedRepository.countDocuments(filter),
      this.feedRepository.findPage(filter, sort, pageOptionsDto),
    ]);
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(feeds, pageMetaDto);
  }

  async findPageAdmin(
    filterFeed: FilterAdminFeedOptionsDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const filter = {};

    if (filterFeed.type) {
      filter['type'] = filterFeed.type;
    }

    const [itemCount, feeds] = await Promise.all([
      this.feedRepository.countDocuments(filter),
      this.feedRepository.findPageAdmin(filter, pageOptionsDto),
    ]);
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(feeds, pageMetaDto);
  }

  async findOneById(id: string) {
    return await this.feedRepository.findOneById(id);
  }
  async findAllById(id: string) {
    return await this.feedRepository.findAllById(id);
  }

  async update(id: string, updateFeedDto: UpdateFeedDto) {
    const filter = { _id: id };
    const result = await this.feedRepository.updateById(filter, updateFeedDto);
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '업데이트에 실패했습니다',
      });
    }
    return { status: 200, message: 'success' };
  }

  async updateLike(id: string, currentUser: UsersDto) {
    const userId = currentUser._id;
    const feed = await this.feedRepository.findOneById(id);
    if (!feed) {
      throw new NotFoundException({
        status: 404,
        message: '해당 피드를 찾을 수 없습니다',
      });
    }
    const filter = { _id: id };
    const isLikes = feed.likes.some((like) => like.equals(userId));
    if (isLikes) {
      feed.likes = feed.likes.filter((like) => !like.equals(userId));
      await this.feedRepository.updateById(filter, feed);
      return { status: 200, message: 'dislike' };
    } else {
      feed.likes.push(userId);
      await this.feedRepository.updateById(filter, feed);
      return { status: 200, message: 'like' };
    }
  }

  async remove(id: string) {
    const filter = { _id: new Types.ObjectId(id) };
    const result = await this.feedRepository.delete(filter);
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '삭제에 실패했습니다',
      });
    }
    return { status: 200, message: 'success' };
  }
}
