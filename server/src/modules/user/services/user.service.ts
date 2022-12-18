import { UserDto } from './../dto/user.dto';
import { ResponseUserDto } from './../dto/response-user.dto';
/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;
    await this.existsByEmail(email);
    await this.existsByUsername(username);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    if (!user) {
      throw new NotFoundException({
        status: 404,
        message: '생성에 실패했습니다 ',
      });
    }
    return { status: 201, message: 'success' };
  }

  async findAll(): Promise<UserDto[]> {
    const userList = await this.userRepository.findAll();
    return userList;
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findUserByUsername(username);
    return new ResponseUserDto(user);
  }

  //password 를 반환해야함(login에서 씀)
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }
  async updateByUsername(id: string, updateUserDto: UpdateUserDto) {
    const { username } = updateUserDto;
    await this.existsByUsername(username);

    const result = await this.userRepository.updateByUsername(
      id,
      updateUserDto,
    );
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '업데이트에 실패했습니다',
      });
    }
    return { status: 200, message: 'success' };
  }

  async deleteOneByUsername(username: string) {
    const result = await this.userRepository.deleteOneByUsername(username);
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '삭제에 실패했습니다',
      });
    }
    return { status: 200, message: 'success' };
  }
  //존재여부검사 func 모아두기
  async existsByEmail(email: string) {
    const isEmailExist = await this.userRepository.existsByEmail(email);
    if (isEmailExist) {
      throw new UnauthorizedException('해당 이메일이 이미 존재합니다');
    }
  }
  async existsByUsername(username: string) {
    const isUsernameExist = await this.userRepository.existsByUsername(
      username,
    );
    if (isUsernameExist) {
      throw new UnauthorizedException('해당 이름이 이미 존재합니다');
    }
  }
}
