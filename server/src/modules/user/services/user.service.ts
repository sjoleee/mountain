/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;
    await this.existsByEmail(email);
    await this.existsByUsername(username);
    const user = await this.userRepository.create({
      email,
      username,
      password,
    });
    return user;
  }

  async findAll() {
    const userList = await this.userRepository.findAll();
    return userList;
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findUserByUsername(username);
    return user;
  }

  async updateByUsername(username: string, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository.updateByUsername(
      username,
      updateUserDto,
    );
    return result;
  }

  async deleteOneByUsername(username: string) {
    const result = await this.userRepository.deleteOneByUsername(username);
    return result;
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
