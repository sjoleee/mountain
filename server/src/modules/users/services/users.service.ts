import { ObjectId, Types } from 'mongoose';
import { BadgesRepository } from './../../badges/badges.repository';
/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { pointToTier } from 'src/common/enums/tier.enum';
import { CreateUsersDto } from '../dto/create-users.dto';
import { FilterAdminUsersOptionsDto } from '../dto/filter-admin-users-options.dto';
import { ResponseUsersDto } from '../dto/response-users.dto';
import { UpdateUsersDto } from '../dto/update-users.dto';
import { UsersRepository } from '../users.repository';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly badgesRepository: BadgesRepository,
  ) {}

  async signUp(createUserDto: CreateUsersDto) {
    const { email, username, password } = createUserDto;
    await this.existsByEmail(email);
    await this.existsByUsername(username);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
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

  async findAll(point): Promise<ResponseUsersDto[]> {
    const sort = {};
    if (point) {
      sort['point'] = -1;
    }
    const userList = await this.usersRepository.findAll({ sort });
    return userList.map((v) => new ResponseUsersDto(v));
  }

  async findOneByUsername(username: string): Promise<ResponseUsersDto> {
    const user = await this.usersRepository.findUserByUsername(username);
    return new ResponseUsersDto(user);
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOneUserById(id);
    return user;
  }
  //password 를 반환해야함(login에서 씀)
  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findUserByEmail(email);
    return user;
  }
  async updateById(id: string, updateUserDto: UpdateUsersDto) {
    const { username } = updateUserDto;
    await this.existsByUsername(username);

    const result = await this.usersRepository.updateById(id, updateUserDto);
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '업데이트에 실패했습니다',
      });
    }
    return { status: 200, message: 'success' };
  }

  async deleteOneById(username: string) {
    const result = await this.usersRepository.deleteOneById(username);
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
    const isEmailExist = await this.usersRepository.existsByEmail(email);
    if (isEmailExist) {
      throw new UnauthorizedException('해당 이메일이 이미 존재합니다');
    }
  }
  async existsByUsername(username: string) {
    const isUsernameExist = await this.usersRepository.existsByUsername(
      username,
    );
    if (isUsernameExist) {
      throw new UnauthorizedException('해당 이름이 이미 존재합니다');
    }
  }

  async findPage(
    filterFeed: FilterAdminUsersOptionsDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const filter = {};

    const [itemCount, feeds] = await Promise.all([
      this.usersRepository.countDocuments(filter),
      this.usersRepository.findPage(filter, pageOptionsDto),
    ]);
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(feeds, pageMetaDto);
  }

  async addPoint(userId, point: number) {
    const user = await this.usersRepository.findOneUserById(userId);
    if (!user) {
      throw new NotFoundException({
        status: 404,
        message: '유저를 찾을 수 없습니다',
      });
    }
    const newBody = { point: user.point + point };
    const result = await this.usersRepository.updateById(userId, newBody);
    await this.advancement(userId);
    return result;
  }
  async addMountain(userId, mountainId) {
    const user = await this.usersRepository.findOneUserById(userId);
    if (!user) {
      throw new NotFoundException({
        status: 404,
        message: '유저를 찾을 수 없습니다',
      });
    }
    const isMountain = user.mountainList.some((list) =>
      list.equals(mountainId),
    );
    if (!isMountain) {
      user.mountainList.push(mountainId);
      await this.usersRepository.updateById(userId, user);
      return { status: 200, message: '추가되었습니다' };
    }
  }

  async addBadge(userId, mountainId) {
    const user = await this.usersRepository.findOneUserById(userId);
    if (!user) {
      throw new NotFoundException({
        status: 404,
        message: '유저를 찾을 수 없습니다',
      });
    }
    const filter = { mountain: mountainId };
    const badge = await this.badgesRepository.findOne(filter);
    if (!badge) {
      throw new NotFoundException({
        status: 404,
        message: '뱃지를 찾을 수 없습니다',
      });
    }
    const badgeId = badge._id;
    const isBadge = user.badgeList.some((list) => list.equals(badgeId));
    if (!isBadge) {
      user.badgeList.push(badgeId);
      await this.usersRepository.updateById(userId, user);
      return { status: 200, message: '추가되었습니다' };
    }
  }

  async addChallenge(userId, challengeId) {
    const user = await this.usersRepository.findOneUserById(userId);
    if (!user) {
      throw new NotFoundException({
        status: 404,
        message: '유저를 찾을 수 없습니다',
      });
    }
    const isChallenge = user.completedList.some((list) =>
      list.equals(challengeId),
    );
    if (!isChallenge) {
      user.completedList.push(challengeId);
      await this.usersRepository.updateById(userId, user);
      return { status: 200, message: '추가되었습니다' };
    }
  }

  async advancement(userId) {
    const user = await this.usersRepository.findOneUserById(userId);
    if (!user) {
      throw new NotFoundException({
        status: 404,
        message: '유저를 찾을 수 없습니다',
      });
    }
    const newBody = { tier: pointToTier(user.point) };
    return await this.usersRepository.updateById(userId, newBody);
  }
}
