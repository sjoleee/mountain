import { PartialType } from '@nestjs/swagger';
import { CreateMountainDto } from './create-mountain.dto';

export class UpdateMountainDto extends PartialType(CreateMountainDto) {}
