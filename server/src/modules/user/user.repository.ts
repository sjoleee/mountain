import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: any) {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async findAll() {
    const users = await this.userModel.find({});
    return users;
  }

  async findOneUserById(id: string): Promise<UserDto | null> {
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }

  async findUserByEmail(email: string): Promise<UserDto | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findUserByUsername(username: string): Promise<UserDto | null> {
    const user = await this.userModel.findOne({ username: username });
    return user;
  }

  async updateById(id: string, body: UpdateUserDto): Promise<User | null> {
    const result = await this.userModel
      .findOneAndUpdate({ _id: id }, body)
      .exec();
    return result;
  }

  async deleteOneById(id: string): Promise<User | null> {
    const result = await this.userModel.findOneAndDelete({ _id: id }).exec();
    return result;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = (await this.userModel.exists({ email })) ? true : false;
    return result;
  }
  async existsByUsername(username: string): Promise<boolean> {
    const result = (await this.userModel.exists({ username })) ? true : false;
    return result;
  }

  async findUserByIdWithoutPassword(
    id: string | Types.ObjectId,
  ): Promise<User | null> {
    const user = await this.userModel.findById(id).select('-password');
    return user;
  }
}
