import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMountainDto } from './dto/create-mountain.dto';
import { UpdateMountainDto } from './dto/update-mountain.dto';
import { Mountains } from './schemas/mountains.schema';

@Injectable()
export class MountainsRepository {
  constructor(
    @InjectModel(Mountains.name)
    private readonly mountainsModel: Model<Mountains>,
  ) {}

  async create(createMountainDto: CreateMountainDto) {
    const newMountain = await this.mountainsModel.create(createMountainDto);
    return newMountain;
  }
  async find(filter: any) {
    const mountains = await this.mountainsModel.find(filter);
    return mountains;
  }
  async findOne(filter: any) {
    const mountain = await this.mountainsModel.findOne(filter);
    return mountain;
  }
  async update(filter: any, body: UpdateMountainDto) {
    const result = await this.mountainsModel
      .findOneAndUpdate(filter, body)
      .exec();
    return result;
  }
  async delete(filter: any) {
    const result = await this.mountainsModel.findOneAndDelete(filter).exec();
    return result;
  }
  async getByKakaoId(filter: any) {
    const result = await this.mountainsModel.findOneAndDelete(filter).exec();
    return result;
  }
}
