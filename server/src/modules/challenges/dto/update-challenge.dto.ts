import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { CreateChallengeDto } from './create-challenge.dto';
export class UpdateChallengeDto extends PartialType(CreateChallengeDto) {
  @ApiProperty({
    example: 'feedId',
    description: '챌린지 피드를 제출하고나서 담기는 피드 ID',
    required: false,
  })
  @IsOptional()
  approval?: Types.ObjectId;

  @ApiProperty({
    example: 'false',
    description: '챌린지가 승인됐는지 확인',
    required: true,
    default: false,
  })
  @IsOptional()
  approved?: boolean;
}
