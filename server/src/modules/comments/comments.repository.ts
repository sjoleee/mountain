import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from './schemas/comments.schema';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {}
  async findAll({ filter = {}, sort = {} }) {
    const comments = await this.commentsModel.find(filter).sort(sort);
    return comments;
  }
  async create(body: any) {
    const comment = await this.commentsModel.create(body);
    return comment;
  }
  async deleteAll(filter) {
    return await this.commentsModel.deleteMany(filter);
  }
}
