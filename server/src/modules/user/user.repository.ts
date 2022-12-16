import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    const user = await this.userModel.find({});
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    //패스워드를 숨기는 법 질문
    // const responseUser = new ResponseUserDto(user);
    return user;
  }

  async updateByUsername(
    username: string,
    body: UpdateUserDto,
  ): Promise<User | null> {
    const result = await this.userModel
      .findOneAndUpdate({ username }, body)
      .exec();
    return result;
  }

  async deleteOneByUsername(username: string): Promise<User | null> {
    const result = await this.userModel.findOneAndDelete({ username }).exec();
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

  async findUserByIdWithoutPassword(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).select('-password');
    return user;
  }
}
