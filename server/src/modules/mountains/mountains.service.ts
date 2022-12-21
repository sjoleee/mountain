import { Injectable } from '@nestjs/common';
import { CreateMountainDto } from './dto/create-mountain.dto';
import { UpdateMountainDto } from './dto/update-mountain.dto';

@Injectable()
export class MountainsService {
  create(createMountainDto: CreateMountainDto) {
    return 'This action adds a new mountain';
  }

  findAll() {
    return `This action returns all mountains`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mountain`;
  }

  update(id: number, updateMountainDto: UpdateMountainDto) {
    return `This action updates a #${id} mountain`;
  }

  remove(id: number) {
    return `This action removes a #${id} mountain`;
  }
}
