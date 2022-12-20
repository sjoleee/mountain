import { defaultDto } from './../../../common/dto/default-dto';
import { ObjectId, Types } from 'mongoose';
import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Comments } from 'src/modules/comments/schemas/comments.schema';

enum Local {
  서울 = '서울',
  경기도 = '경기도',
  강원도 = '강원도',
  경상북도 = '경상북도',
  경상남도 = '경상남도',
  전라북도 = '전라북도',
  충청북도 = '충청북도',
  충청남도 = '충청남도',
}
enum Tier {
  언랭 = '언랭',
  브론즈 = '브론즈',
  실버 = '실버',
  골드 = '골드',
  플래티넘 = '플래티넘',
  다이아몬드 = '다이아몬드',
  엄홍길 = '엄홍길',
}
type Gender = '남성' | '여성';
type Completed = {
  cName: string;
  cDif: string;
};

export class UserDto extends defaultDto {
  @ApiProperty({
    example: 'swaggerID@test.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'swaggerUser',
    description: '유저네임',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '1234',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '010-1111-1111',
    description: '전화번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: '경상',
    description: '지역',
    required: true,
  })
  @IsNotEmpty()
  local: Local;

  @ApiProperty({
    example: '남성',
    description: '성별',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  gender: Gender;
  //필수필드
  @IsOptional()
  @ApiProperty({
    example: '골드',
    description: '티어',
    required: true,
  })
  tier: Tier;

  @IsOptional()
  @ApiProperty({
    example: '반갑습니다',
    description: '자기소개',
    required: true,
  })
  @IsString()
  intro: string;

  @IsOptional()
  @ApiProperty({
    example: '24',
    description: '나이',
    required: true,
  })
  @IsNumber()
  age: number;

  @IsOptional()
  @ApiProperty({
    example: 'http//example.com',
    description: '프로필 사진 주소',
    required: true,
  })
  profileImg: string;

  @IsOptional()
  @ApiProperty({
    example: '[9283923,123123,123213,232323]',
    description: '찜리스트',
    required: false,
  })
  choiceList: Array<string>;

  @IsOptional()
  @ApiProperty({
    example: '[{챌린지1, 하},{챌린지2, 중}]',
    description: '챌린지 완료 리스트',
    required: false,
  })
  @IsString()
  completedList: Array<Completed>;

  @IsOptional()
  @ApiProperty({
    example: '[뱃지1,뱃지2]',
    description: '뱃지 리스트',
    required: false,
  })
  @IsString()
  badgeList: Array<string>;

  @IsOptional()
  @ApiProperty({
    example: '[산1,산2]',
    description: '완료한 산 리스트',
    required: false,
  })
  @IsString()
  mountainList: Array<string>;
}
