import { Badges } from './../badges/schemas/badges.schema';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenges } from './schemas/challenges.schema';
import { ChallengeDto } from './dto/challenges.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { FilterAdminChallengesOptionsDto } from './dto/filter-admin-challenges-options.dto';
import { Users } from '../users/schemas/users.schema';
import { Mountains } from '../mountains/schemas/mountains.schema';

@Injectable()
export class ChallengesRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
    @InjectModel(Badges.name) private readonly badgesModel: Model<Badges>,
    @InjectModel(Mountains.name)
    private readonly mountainsModel: Model<Mountains>,
    @InjectModel(Challenges.name)
    private readonly challengesModel: Model<Challenges>,
  ) {}

  async create(body: CreateChallengeDto) {
    const newChallenge = await this.challengesModel.create(body);
    return newChallenge;
  }

  async findAll() {
    const challenges = await this.challengesModel.find({});
    return challenges;
  }
  async findAllByFilter(filter: any) {
    const challenges = await this.challengesModel.find(filter).populate({
      path: 'mountain',
      model: this.mountainsModel,
    });
    return challenges;
  }
  async findOneById(id: string): Promise<ChallengeDto | null> {
    const challenge = await this.challengesModel
      .findOne({ _id: id })
      .populate({
        path: 'organizer',
        model: this.userModel,
        populate: {
          path: 'badgeList',
          model: this.badgesModel,
        },
      })
      .populate({
        path: 'waitingList',
        model: this.userModel,
        populate: {
          path: 'badgeList',
          model: this.badgesModel,
        },
      })
      .populate({
        path: 'peopleList',
        model: this.userModel,
        populate: {
          path: 'badgeList',
          model: this.badgesModel,
        },
      })
      .populate({
        path: 'mountain',
        model: this.mountainsModel,
      });
    return challenge;
  }
  async updateById(id: string, body: UpdateChallengeDto) {
    const result = await this.challengesModel
      .findOneAndUpdate({ _id: id }, body)
      .exec();
    return result;
  }
  async deleteOneById(id: string) {
    const result = await this.challengesModel
      .findOneAndDelete({ _id: id })
      .exec();
    return result;
  }
  async updateApprove(id: string) {
    const result = await this.challengesModel
      .findOneAndUpdate({ _id: id }, { approved: true })
      .exec();
    return result;
  }

  async countDocuments(filter) {
    const users = await this.challengesModel.find(filter);
    return users.length;
  }

  async findPage(
    filter: FilterAdminChallengesOptionsDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    return await this.challengesModel
      .find(filter)
      .sort({ dueDate: -1 })
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.take);
  }

  async apply(id: string, body) {
    const result = await this.challengesModel
      .findOneAndUpdate({ _id: id }, body)
      .exec();
    return result;
  }

  async deleteAll(filter) {
    return await this.challengesModel.deleteMany(filter);
  }
}
