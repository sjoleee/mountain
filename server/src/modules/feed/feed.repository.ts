import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Comments } from '../comments/schemas/comments.schema';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './schemas/feed.schema';
import { Users } from '../users/schemas/users.schema';
import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { FilterFeedOptionsDto } from './dto/filter-feed-options.dto';

@Injectable()
export class FeedRepository {
  constructor(
    @InjectModel(Feed.name) private readonly feedModel: Model<Feed>,
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async createFeed(createFeedDto: CreateFeedDto) {
    const newFeed = await this.feedModel.create(createFeedDto);
    return newFeed;
  }

  async findAll() {
    const feeds = await this.feedModel
      .find()
      .populate('comments', '', this.commentsModel);
    return feeds;
  }
  async findAllWithQuery(filter) {
    const feeds = await this.feedModel
      .find(filter)
      .populate('comments', '', this.commentsModel)
      .populate('author', '', this.userModel);
    return feeds;
  }
  async findAllById(id: string) {
    const feeds = await this.feedModel.find({ author: id });
    return feeds;
  }

  async findOneById(id: string) {
    const feed = await this.feedModel
      .findOne({ _id: id })
      .populate({
        path: 'author',
        model: this.userModel,
      })
      .populate({
        path: 'comments',
        model: this.commentsModel,
        populate: {
          path: 'author',
          model: this.userModel,
        },
      });
    return feed;
  }

  async findPage(
    filter: FilterFeedOptionsDto,
    sort,
    pageOptionsDto: PageOptionsDto,
  ) {
    return await this.feedModel
      .find(filter)
      .populate('comments', '', this.commentsModel)
      .populate('author', '', this.userModel)
      .sort(sort)
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.take);
  }
  async findPageAdmin(
    filter: FilterFeedOptionsDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    return await this.feedModel
      .find(filter)
      .populate('comments', '', this.commentsModel)
      .populate('author', '', this.userModel)
      .sort({ createdAt: pageOptionsDto.order })
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.take);
  }

  async findPageKakao(filter: FilterFeedOptionsDto, sort, pageOptionsDto: any) {
    return await this.feedModel
      .find(filter)
      .sort(sort)
      .limit(pageOptionsDto.take);
  }
  async countDocuments(filter: any) {
    const feeds = await this.feedModel.find(filter);
    return feeds.length;
  }

  async updateById(filter: any, body: any) {
    const result = await this.feedModel.findOneAndUpdate(filter, body).exec();
    return result;
  }
  async delete(filter: any) {
    const result = await this.feedModel.findOneAndDelete(filter).exec();
    return result;
  }

  async findByFilter(filter: any, sort: any) {
    return await this.feedModel.find(filter).sort(sort);
  }

  async deleteAll(filter) {
    return await this.feedModel.deleteMany(filter);
  }
}
