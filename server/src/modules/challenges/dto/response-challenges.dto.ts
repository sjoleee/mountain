import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { Local } from 'src/common/enums/local.enum';
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
    description: '마감 날짜',
    required: true,
  })
  @IsNotEmpty()
  dueDate: Date;

  @ApiProperty({
    example: '2022-12-19T15:50:37.154Z',
    description: '모집 날짜',
    required: true,
  })
  @IsNotEmpty()
  period: Date;

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
  content: string;

  @ApiProperty({
    example: '3',
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
  local: Local;

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
  level: string;

  @ApiProperty({
    example: '{tier:"실버",local:"제주도"}',
    description: '조건 - 나중에 수정 예정 실버이상, 제주도만',
    required: false,
  })
  conditions: Array<string>;
  constructor(challenge: ResponseChallengeDto) {
    this._id = challenge._id;
    this.createdAt = challenge.createdAt;
    this.updatedAt = challenge.updatedAt;
    this.logo = challenge.logo;
    this.name = challenge.name;
    this.dueDate = challenge.dueDate;
    this.period = challenge.period;
    this.MaximumPeople = challenge.MaximumPeople;
    this.waitingList = challenge.waitingList;
    this.peopleList = challenge.peopleList;
    this.content = challenge.content;
    this.point = challenge.point;
    this.local = challenge.local;
    this.organizer = challenge.organizer;
    this.level = challenge.level;
    this.conditions = challenge.conditions;
    this.mountain = challenge.mountain;
  }
}
