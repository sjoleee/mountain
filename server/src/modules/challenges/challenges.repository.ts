import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenges } from './schemas/challenges.schema';
import { ChallengeDto } from './dto/challenges.dto';

@Injectable()
export class ChallengesRepository {
  constructor(
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
    const challenges = await this.challengesModel.find(filter);
    return challenges;
  }
  async findOneById(id: string): Promise<ChallengeDto | null> {
    const challenge = await this.challengesModel.findOne({ _id: id });
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
}
