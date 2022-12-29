import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { Level } from 'src/common/enums/level.enum';
import { Region } from 'src/common/enums/region.enum';
import { Tier } from 'src/common/enums/tier.enum';
export class ResponseChallengeDto {
  @ApiProperty({
    example: '63a01bee499bb3ae6c2c37b6',
    description: 'mongodb에서 생성된 ObjectId',
    required: true,
  })
  @IsNotEmpty()
  _id: Types.ObjectId;

  @ApiProperty({
    example: '2020',
    description: 'createdAt',
    required: false,
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: 'updatedAt',
    description: 'updatedAt',
    required: false,
  })
  @IsNotEmpty()
  updatedAt: Date;
  @ApiProperty({
    example: '로고url ',
    description: '챌린지 로고',
    required: true,
  })
  @IsNotEmpty()
  logo: string;

  @ApiProperty({
    example: '챌린지 이름 예시',
    description: '챌린지 이름',
    required: true,
  })
  @IsNotEmpty()
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
    example: '2022-12-19T15:50:37.154Z',
    description: '마감 날짜',
    required: true,
  })
  @IsNotEmpty()
  dueDate: Date;

  @ApiProperty({
    example: '10',
    description: '최대 인원',
    required: false,
  })
  @IsNotEmpty()
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
  mountain: Types.ObjectId;

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
  content: string;

  @ApiProperty({
    example: 3,
    description: '챌린지 점수',
    required: true,
  })
  @IsNotEmpty()
  point: number;

  @ApiProperty({
    example: '경상북도',
    description: '활동 지역',
    required: true,
  })
  @IsNotEmpty()
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
  })
  @IsNotEmpty()
  level: Level;

  @ApiProperty({
    example: '브론즈',
    description: '티어조건 ',
    required: true,
    default: '브론즈',
  })
  conditions: Tier;

  @IsOptional()
  approval?: Types.ObjectId;

  @IsOptional()
  approved?: boolean;

  @ApiProperty({
    example: '["태그1","태그2"]',
    description: '챌린지 태그',
    required: false,
  })
  @IsOptional()
  hashtag: Array<string>;

  constructor(challenge: ResponseChallengeDto) {
    this._id = challenge._id;
    this.createdAt = challenge.createdAt;
    this.updatedAt = challenge.updatedAt;
    this.logo = challenge.logo;
    this.name = challenge.name;
    this.dueDate = challenge.dueDate;
    this.startDate = challenge.startDate;
    this.finishDate = challenge.finishDate;
    this.MaximumPeople = challenge.MaximumPeople;
    this.waitingList = challenge.waitingList;
    this.peopleList = challenge.peopleList;
    this.content = challenge.content;
    this.point = challenge.point;
    this.region = challenge.region;
    this.organizer = challenge.organizer;
    this.level = challenge.level;
    this.conditions = challenge.conditions;
    this.mountain = challenge.mountain;
    this.approval = challenge.approval;
    this.approved = challenge.approved;
    this.hashtag = challenge.hashtag;
  }
}
