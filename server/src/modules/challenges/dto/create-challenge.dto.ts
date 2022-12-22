import { Region } from './../../../common/enums/region.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
export class CreateChallengeDto {
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
    default: new Date(),
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({
    example: '2022-12-19T15:50:37.154Z',
    description: '끝나는 날짜',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  finishDate: Date;

  @ApiProperty({
    example: '2022-12-19',
    description: '모집 날짜',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @ApiProperty({
    example: '로고url ',
    description: '챌린지 로고',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  logo: string;

  @ApiProperty({
    example: '10',
    description: '최대 인원',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  MaximumPeople: number;

  @ApiProperty({
    example: '129392932',
    description: '산 아이디(일단 string 산module구현시 수정',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  mountain: string;

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
  @IsEnum(Region)
  region: Region;

  @ApiProperty({
    example: '상',
    description: '난이도',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  level: string;
}
