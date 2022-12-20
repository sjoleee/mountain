import { FeedRepository } from './../feed.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedDto } from '../dto/create-feed.dto';
import { UpdateFeedDto } from '../dto/update-feed.dto';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}

  async createFeed(createFeedDto: CreateFeedDto) {
    const newFeed = await this.feedRepository.createFeed(createFeedDto);
    if (!newFeed) {
      throw new NotFoundException({
        status: 404,
        message: '생성에 실패했습니다 ',
      });
    }
    return { status: 201, message: 'success' };
  }

  async findAll() {
    return await this.feedRepository.findAll();
  }
  async findAllWithQuery(query) {
    return await this.feedRepository.findAllWithQuery(query);
  }

  async findOneById(id: string) {
    return await this.feedRepository.findOneById(id);
  }
  async findAllById(id: string) {
    return await this.feedRepository.findAllById(id);
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
  }

  remove(id: number) {
    return `This action removes a #${id} feed`;
  }
}
