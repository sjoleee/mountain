import { Challenges } from './schemas/challenges.schema';
import { UsersService } from './../users/services/users.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ObjectId, Types } from 'mongoose';
import { ChallengeDto } from './dto/challenges.dto';
import { ChallengesRepository } from './challenges.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ResponseChallengeDto } from './dto/response-challenges.dto';
import { ResponseStatusDto } from 'src/common/dto/response-status';
import { UsersDto } from '../users/dto/users.dto';
import { Level, levelToPoint } from 'src/common/enums/level.enum';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { FilterAdminChallengesOptionsDto } from './dto/filter-admin-challenges-options.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { FilterChallengesOptionsDto } from './dto/filter-challenges-options.dto';
import { tierOrder } from 'src/common/enums/tier.enum';

@Injectable()
export class ChallengesService {
  constructor(
    private readonly challengesRepository: ChallengesRepository,
    private readonly usersService: UsersService,
  ) {}
  async create(
    currentUser: UsersDto,
    createChallengeDto: CreateChallengeDto,
  ): Promise<ResponseStatusDto> {
    const challengeDto = {
      ...createChallengeDto,
      organizer: new Types.ObjectId(currentUser._id),
      point: levelToPoint(createChallengeDto.level),
    };
    const newChallenge = await this.challengesRepository.create(challengeDto);
    if (!newChallenge) {
      throw new NotFoundException({
        status: 404,
        message: '생성에 실패했습니다 ',
      });
    }
    return { status: 201, message: 'success' };
  }

  async findAll() {
    return await this.challengesRepository.findAll();
  }
  async findAllByUserId(userId: string) {
    const filter = { organizer: new Types.ObjectId(userId) };
    return await this.challengesRepository.findAllByFilter(filter);
  }

  async findOneById(id: string): Promise<ResponseChallengeDto> {
    const challenge = await this.challengesRepository.findOneById(id);
    return new ResponseChallengeDto(challenge);
  }

  async updateById(
    id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<ResponseStatusDto> {
    const result = await this.challengesRepository.updateById(
      id,
      updateChallengeDto,
    );
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '업데이트에 실패했습니다',
      });
    }
    return { status: 200, message: 'success' };
  }

  async removeById(id: string): Promise<ResponseStatusDto> {
    const result = await this.challengesRepository.deleteOneById(id);
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '삭제에 실패했습니다',
      });
    }
    return { status: 200, message: 'success' };
  }

  async updateApprove(id: string): Promise<ResponseStatusDto> {
    const challenge = await this.challengesRepository.findOneById(id);
    if (!challenge) {
      throw new NotFoundException({
        status: 404,
        message: '업데이트에 실패했습니다',
      });
    }
    challenge.peopleList.forEach((peopleId) => {
      this.usersService.addPoint(peopleId, challenge.point);
    });
    const result = await this.challengesRepository.updateApprove(id);
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '업데이트에 실패했습니다',
      });
    }
    return { status: 200, message: 'success' };
  }

  async findPage(
    filterChallenge: FilterChallengesOptionsDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const filter = {};
    if (filterChallenge.level) {
      filter['level'] = filterChallenge.level;
    }
    if (filterChallenge.tier) {
      filter['conditions'] = tierOrder(filterChallenge.tier);
    }
    if (filterChallenge.region) {
      filter['region'] = filterChallenge.region;
    }
    const [itemCount, feeds] = await Promise.all([
      this.challengesRepository.countDocuments(filter),
      this.challengesRepository.findPage(filter, pageOptionsDto),
    ]);
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(feeds, pageMetaDto);
  }

  async findPageAdmin(
    filterChallenge: FilterAdminChallengesOptionsDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const filter = {};

    const [itemCount, feeds] = await Promise.all([
      this.challengesRepository.countDocuments(filter),
      this.challengesRepository.findPage(filter, pageOptionsDto),
    ]);
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(feeds, pageMetaDto);
  }

  async apply(id, currentUser: UsersDto) {
    const userId = currentUser._id;
    const challenge = await this.challengesRepository.findOneById(id);
    if (!challenge) {
      throw new NotFoundException({
        status: 404,
        message: '해당 피드를 찾을 수 없습니다',
      });
    }
    const isMember = challenge.waitingList.some((list) => list.equals(userId));
    if (isMember) {
      challenge.waitingList = challenge.waitingList.filter(
        (user) => !user.equals(userId),
      );
      await this.challengesRepository.updateById(id, challenge);
      return { status: 200, message: '신청취소하였습니다' };
    } else {
      challenge.waitingList.push(userId);
      await this.challengesRepository.updateById(id, challenge);
      return { status: 200, message: '신청되었습니다' };
    }
  }

  async refuse(id, userId, currentUser: UsersDto) {
    const isOrganizer = await this.isOrganizer(currentUser._id, id);
    if (!isOrganizer) {
      throw new NotFoundException({
        status: 404,
        message: '해당 유저는 이 챌린지의 주최자가 아닙니다',
      });
    }
    const challenge = await this.challengesRepository.findOneById(id);
    if (!challenge) {
      throw new NotFoundException({
        status: 404,
        message: '해당 피드를 찾을 수 없습니다',
      });
    }
    const isMember = challenge.waitingList.some((list) => list.equals(userId));
    if (isMember) {
      challenge.waitingList = challenge.waitingList.filter(
        (user) => !user.equals(userId),
      );
      await this.challengesRepository.updateById(id, challenge);
      return { status: 200, message: '거절하였습니다' };
    } else {
      throw new NotFoundException({
        status: 404,
        message: '해당 유저가 없습니다',
      });
    }
  }

  async accept(id, userId, currentUser: UsersDto) {
    const isOrganizer = await this.isOrganizer(currentUser._id, id);
    if (!isOrganizer) {
      throw new NotFoundException({
        status: 404,
        message: '해당 유저는 이 챌린지의 주최자가 아닙니다',
      });
    }
    const challenge = await this.challengesRepository.findOneById(id);
    if (!challenge) {
      throw new NotFoundException({
        status: 404,
        message: '해당 챌린지를 찾을 수 없습니다',
      });
    }
    const isMember = challenge.waitingList.some((list) => list.equals(userId));
    if (isMember) {
      challenge.waitingList = challenge.waitingList.filter(
        (user) => !user.equals(userId),
      );
      challenge.peopleList.push(userId);
      await this.challengesRepository.updateById(id, challenge);
      return { status: 200, message: '승인하였습니다' };
    } else {
      throw new NotFoundException({
        status: 404,
        message: '해당 유저가 없습니다',
      });
    }
  }
  async isOrganizer(userId, challengeId) {
    const challenge = await this.challengesRepository.findOneById(challengeId);
    if (!challenge) {
      throw new NotFoundException({
        status: 404,
        message: '해당 챌린지를 찾을 수 없습니다',
      });
    }
    if (!challenge.organizer) {
      throw new NotFoundException({
        status: 404,
        message: '주최자의 정보를 찾을 수 없습니다',
      });
    }
    return challenge.organizer.equals(userId) ? true : false;
  }
}
