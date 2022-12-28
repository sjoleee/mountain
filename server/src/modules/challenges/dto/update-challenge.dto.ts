import { Region } from './../../../common/enums/region.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateChallengeDto {
  @ApiProperty({
    example: '로고url ',
    description: '챌린지 로고',
  })
  @IsOptional()
  logo?: string;

  @ApiProperty({
    example: '챌린지 이름 예시',
    description: '챌린지 이름',
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '2022-12-19T15:50:37.154Z',
    description: '마감 날짜',
  })
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({
    example: '2022-12-19T15:50:37.154Z',
    description: '모집 날짜',
  })
  @IsOptional()
  period?: Date;

  @ApiProperty({
    example: '10',
    description: '최대 인원',
  })
  @IsOptional()
  MaximumPeople?: number;

  @ApiProperty({
    example: '[2302130213,213213123]',
    description: '대기 인원 리스트',
    default: [],
  })
  @IsOptional()
  waitingList?: Array<Types.ObjectId>;

  @ApiProperty({
    example: '129392932',
    description: '산 아이디(일단 string 산module구현시 수정',
    required: false,
  })
  @IsOptional()
  mountain?: Types.ObjectId;

  @ApiProperty({
    example: '[1231223123,818123213]',
    description: '총 인원 리스트',
    default: [],
  })
  @IsOptional()
  peopleList?: Array<Types.ObjectId>;

  @ApiProperty({
    example: '우리 챌린지는 이러한 활동을 합니다',
    description: '챌린지 내용 (소개글)',
  })
  @IsOptional()
  content?: string;

  @ApiProperty({
    example: '3',
    description: '챌린지 점수',
  })
  @IsOptional()
  point?: number;

  @ApiProperty({
    example: '경상북도',
    description: '활동 지역',
  })
  @IsOptional()
  region?: Region;

  @ApiProperty({
    example: '23923982',
    description: '주최자',
  })
  @IsOptional()
  organizer?: Types.ObjectId;

  @ApiProperty({
    example: '상',
    description: '난이도',
  })
  @IsOptional()
  level?: string;

  @ApiPropertyOptional({
    example: 'feedId',
    description: '챌린지 피드를 제출하고나서 담기는 피드 ID',
    required: false,
  })
  @IsOptional()
  approval?: Types.ObjectId;
}
