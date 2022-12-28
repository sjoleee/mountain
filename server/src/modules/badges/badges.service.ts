import { ObjectId, Types } from 'mongoose';
import { ResponseStatusDto } from './../../common/dto/response-status';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BadgesRepository } from './badges.repository';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { ResponseBadgeDto } from './dto/response-badge.dto copy';
import { UpdateBadgeDto } from './dto/update-badge.dto';

@Injectable()
export class BadgesService {
  constructor(private readonly badgesRepository: BadgesRepository) {}
  async create(createBadgeDto: CreateBadgeDto): Promise<ResponseStatusDto> {
    const badge = await this.badgesRepository.create(createBadgeDto);
    if (!badge) {
      throw new NotFoundException({
        status: 404,
        message: '생성에 실패했습니다 ',
      });
    }
    return { status: 201, message: 'success' };
  }

  async findAll(): Promise<ResponseBadgeDto[]> {
    const filter = {};
    const badges = await this.badgesRepository.find(filter);
    return badges.map((badge) => new ResponseBadgeDto(badge));
  }

  async findOne(id: string): Promise<ResponseBadgeDto> {
    const filter = { _id: new Types.ObjectId(id) };
    const badge = await this.badgesRepository.findOne(filter);
    return new ResponseBadgeDto(badge);
  }

  async update(
    id: string,
    updateBadgeDto: UpdateBadgeDto,
  ): Promise<ResponseStatusDto> {
    const filter = { _id: new Types.ObjectId(id) };
    const result = await this.badgesRepository.update(filter, updateBadgeDto);
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
    const result = await this.badgesRepository.delete(filter);
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '삭제에 실패했습니다',
      });
    }
    return { status: 200, message: 'success' };
  }
}
