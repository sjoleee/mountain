import { PageDto } from './../../../common/dto/page.dto';
import { FeedRepository } from './../feed.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedDto } from '../dto/create-feed.dto';
import { UpdateFeedDto } from '../dto/update-feed.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { FilterFeedOptionsDto } from '../dto/filter-feed-options.dto';
import { removeEmpty } from 'src/utils/clean-object';
import { Types } from 'mongoose';
import { UsersDto } from 'src/modules/users/dto/users.dto';
import { FeedEnum } from 'src/common/enums/feedtype.enum';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}

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
    const [itemCount, feeds] = await Promise.all([
      this.feedRepository.countDocuments(),
      this.feedRepository.findPage(filter, pageOptionsDto),
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

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
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
