import { Challenges } from './../challenges/schemas/challenges.schema';
import { Badges } from './../badges/schemas/badges.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { FilterAdminUsersOptionsDto } from './dto/filter-admin-users-options.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersDto } from './dto/users.dto';
import { Users } from './schemas/users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
    @InjectModel(Badges.name) private readonly badgesModel: Model<Badges>,
    @InjectModel(Challenges.name)
    private readonly challengesModel: Model<Challenges>,
  ) {}

  async create(user: any) {
    const newUser = await this.usersModel.create(user);
    return newUser;
  }

  async findAll({ filter = {}, sort = {} }) {
    const users = await this.usersModel
      .find(filter)
      .sort(sort)
      .populate({ path: 'badgeList', model: this.badgesModel });
    return users;
  }
  async findByFilter(filter: any) {
    const users = await this.usersModel.find(filter);
    return users;
  }

  async findOneUserById(id: string): Promise<UsersDto | null> {
    const user = await this.usersModel
      .findOne({ _id: id })
      .populate({ path: 'badgeList', select: 'img', model: this.badgesModel })
      .populate({
        path: 'completedList',
        select: 'name',
        model: this.challengesModel,
      });
    return user;
  }

  async findUserByEmail(email: string): Promise<UsersDto | null> {
    const user = await this.usersModel.findOne({ email });
    return user;
  }

  async findUserByUsername(username: string): Promise<UsersDto | null> {
    const user = await this.usersModel.findOne({ username: username });
    return user;
  }

  async updateById(id: string, body: UpdateUsersDto): Promise<Users | null> {
    const result = await this.usersModel
      .findOneAndUpdate({ _id: id }, body)
      .exec();
    return result;
  }

  async deleteOneById(id: string): Promise<Users | null> {
    const result = await this.usersModel.findOneAndDelete({ _id: id }).exec();
    return result;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = (await this.usersModel.exists({ email })) ? true : false;
    return result;
  }
  async existsByUsername(username: string): Promise<boolean> {
    const result = (await this.usersModel.exists({ username })) ? true : false;
    return result;
  }

  async findUserByIdWithoutPassword(
    id: string | Types.ObjectId,
  ): Promise<Users | null> {
    const user = await this.usersModel.findById(id).select('-password');
    return user;
  }

  async countDocuments(filter) {
    const users = await this.usersModel.find(filter);
    return users.length;
  }

  async findPage(
    filter: FilterAdminUsersOptionsDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    console.log(filter);
    return await this.usersModel
      .find(filter)
      .sort({ createdAt: pageOptionsDto.order })
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.take);
  }
}
