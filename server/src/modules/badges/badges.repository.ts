import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { ResponseBadgeDto } from './dto/response-badge.dto copy';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { Badges } from './schemas/badges.schema';

@Injectable()
export class BadgesRepository {
  constructor(
    @InjectModel(Badges.name) private readonly badgesModel: Model<Badges>,
  ) {}

  async create(createBadgeDto: CreateBadgeDto) {
    const newBadge = await this.badgesModel.create(createBadgeDto);
    return newBadge;
  }
  async find(filter: any) {
    const badges = await this.badgesModel.find(filter);
    return badges;
  }
  async findOne(filter: any) {
    const badge = await this.badgesModel.findOne(filter);
    return badge;
  }
  async update(filter: any, body: UpdateBadgeDto) {
    const result = await this.badgesModel.findOneAndUpdate(filter, body).exec();
    return result;
  }
  async delete(filter: any) {
    const result = await this.badgesModel.findOneAndDelete(filter).exec();
    return result;
  }
}
