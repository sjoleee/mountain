import { UsersRepository } from 'src/modules/users/users.repository';
import { FeedRepository } from './../feed/feed.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseStatusDto } from 'src/common/dto/response-status';
import { CreateMountainDto } from './dto/create-mountain.dto';
import { ResponseMountainsDto } from './dto/response-mountains.dto';
import { UpdateMountainDto } from './dto/update-mountain.dto';
import { MountainsRepository } from './mountains.repository';
import { Types } from 'mongoose';

@Injectable()
export class MountainsService {
  constructor(
    private readonly mountainsRepository: MountainsRepository,
    private readonly feedRepository: FeedRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(
    createMountainDto: CreateMountainDto,
  ): Promise<ResponseStatusDto> {
    const badge = await this.mountainsRepository.create(createMountainDto);
    if (!badge) {
      throw new NotFoundException({
        status: 404,
        message: '생성에 실패했습니다 ',
      });
    }
    return { status: 201, message: 'success' };
  }

  async findAll(): Promise<ResponseMountainsDto[]> {
    const filter = {};
    const mountains = await this.mountainsRepository.find(filter);
    return mountains.map((mountain) => new ResponseMountainsDto(mountain));
  }

  async findOne(id: string): Promise<ResponseMountainsDto> {
    const filter = { _id: new Types.ObjectId(id) };
    const badge = await this.mountainsRepository.findOne(filter);
    return new ResponseMountainsDto(badge);
  }

  async update(
    id: string,
    updateMountainDto: UpdateMountainDto,
  ): Promise<ResponseStatusDto> {
    const filter = { _id: new Types.ObjectId(id) };
    const result = await this.mountainsRepository.update(
      filter,
      updateMountainDto,
    );
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '업데이트에 실패했습니다',
      });
    }
    return { status: 200, message: 'success' };
  }

  async remove(id: string) {
    const filter = { _id: new Types.ObjectId(id) };
    const result = await this.mountainsRepository.delete(filter);
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '삭제에 실패했습니다',
      });
    }
    return { status: 200, message: 'success' };
  }

  async getByKakaoId(id: string) {
    //1. 산정보
    const mountainFilter = { mntiid: id };
    const mountain = await this.mountainsRepository.findOne(mountainFilter);
    if (!mountain) {
      throw new NotFoundException({
        status: 404,
        message: '해당 산을 찾을 수 없습니다',
      });
    }
    //2. 산갔다온 유저정보
    const userFilter = { mountainList: [new Types.ObjectId(mountain._id)] };
    const users = await this.usersRepository.findByFilter(userFilter);

    //3. 해시태그된 피드
    const feedFilter = {};
    feedFilter['tag'] = { $in: mountain.mntiname };
    const feedSort = { likes: 'desc' };
    const feedPageOption = { order: 'desc', page: 10, take: 20 };
    const feeds = await this.feedRepository.findPageKakao(
      feedFilter,
      feedSort,
      feedPageOption,
    );
    return { mountain, users, feeds };
  }

  async getByPos({ swLat, swLng, neLat, neLng }) {
    console.log(typeof swLat);
    const posFilter = {};
    posFilter['lat'] = { $gte: swLat, $lte: neLat };
    posFilter['lng'] = { $gte: swLng, $lte: neLng };

    const posSort = { likes: 'desc' };
    const feeds = await this.feedRepository.findByFilter(posFilter, posSort);
    return feeds;
  }
}
