import { User } from './../user/schemas/user.schema';
import { ResponseFeedDto } from './dto/response-feed.dto';
import { FeedDto } from './dto/feed.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comments } from '../comments/schemas/comments.schema';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './schemas/feed.schema';

@Injectable()
export class FeedRepository {
  constructor(
    @InjectModel(Feed.name) private readonly feedModel: Model<Feed>,
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createFeed(createFeedDto: CreateFeedDto) {
    const newFeed = await this.feedModel.create(createFeedDto);
    console.log(createFeedDto, newFeed);
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
      .populate('comments', '', this.commentsModel);
    return feed;
  }
}
