import { ObjectId, Types } from 'mongoose';
import { defaultDto } from './../../../common/dto/default-dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Local } from 'src/modules/user/schemas/local.enum';

export class ChallengeDto extends defaultDto {
  @ApiProperty({
    example: '로고url ',
    description: '챌린지 로고',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  logo: string;

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
    description: '마감 날짜',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @ApiProperty({
    example: '2022-12-19T15:50:37.154Z',
    description: '모집 날짜',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  period: Date;

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
  @IsEnum(Local)
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
  @IsString()
  level: string;

  @ApiProperty({
    example: '{tier:"실버",local:"제주도"}',
    description: '조건 - 나중에 수정 예정 실버이상, 제주도만',
    required: false,
  })
  conditions: Array<string>;
}
