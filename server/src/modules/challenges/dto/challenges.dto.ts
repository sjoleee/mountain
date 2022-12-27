import { Region } from './../../../common/enums/region.enum';
import { Types } from 'mongoose';
import { defaultDto } from './../../../common/dto/default-dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Level } from 'src/common/enums/level.enum';
import { Tier } from 'src/common/enums/tier.enum';

export class ChallengeDto extends defaultDto {
  @ApiProperty({
    example: '챌린지 이름 예시',
    description: '챌린지 이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '2022-12-19T15:50:37.154Z',
    description: '시작 날짜',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiProperty({
    example: '2022-12-19T15:50:37.154Z',
    description: '끝나는 날짜',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  finishDate: Date;

  @ApiProperty({
    example: '로고url ',
    description: '챌린지 로고',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  logo: string;

  @ApiProperty({
    example: '2022-12-19T15:50:37.154Z',
    description: '모집 날짜',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @ApiProperty({
    example: '10',
    description: '최대 인원',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  MaximumPeople: number;

  @ApiProperty({
    example: '[2302130213,213213123]',
    description: '대기 인원 리스트',
    required: false,
  })
  waitingList: Array<Types.ObjectId>;

  @ApiProperty({
    example: '129392932',
    description: '산 아이디(일단 string 산module구현시 수정',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  mountain: string;

  @ApiProperty({
    example: '[1231223123,818123213]',
    description: '총 인원 리스트',
    required: false,
  })
  peopleList: Array<Types.ObjectId>;

  @ApiProperty({
    example: '우리 챌린지는 이러한 활동을 합니다',
    description: '챌린지 내용 (소개글)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: '3',
    description: '챌린지 점수',
    required: true,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  point: number;

  @ApiProperty({
    example: '경상북도',
    description: '활동 지역',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Region)
  region: Region;

  @ApiProperty({
    example: '23923982',
    description: '주최자',
    required: true,
  })
  @IsNotEmpty()
  organizer: Types.ObjectId;

  @ApiProperty({
    example: '상',
    description: '난이도',
    required: true,
    default: Level.LOW,
  })
  @IsNotEmpty()
  level: Level;

  @ApiProperty({
    example: '브론즈',
    description: '티어조건 ',
    required: true,
    default: Tier.브론즈,
  })
  conditions: Tier;

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
    required: false,
  })
  @IsOptional()
  approved: boolean;

  @ApiProperty({
    example: '["태그1","태그2"]',
    description: '챌린지 태그',
    required: false,
  })
  @IsOptional()
  tag: Array<string>;
}
