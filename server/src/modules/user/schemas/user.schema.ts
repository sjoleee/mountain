import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsMongoId, IsNumber } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, ObjectId, SchemaOptions } from 'mongoose';
import { defaultSchema } from 'src/common/interface/default-schema';
import { Local } from './local.enum';
import { Tier } from './tier.enum';

// const LocalCode = { 서울특별시: '00' } as const;
// type Local = typeof LocalCode[keyof typeof LocalCode];

type Gender = '남성' | '여성';
type Completed = {
  cName: string;
  cDif: string;
};

const options: SchemaOptions = {
  collection: 'users',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
};
@Schema(options)
export class User extends defaultSchema {
  @ApiProperty({
    example: 'swaggerID@test.com',
    description: '이메일',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'swaggerUser',
    description: '유저네임',
    required: true,
  })
  @Prop({
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
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  profilePhoto: string;

  @ApiProperty({
    example: '010-1111-1111',
    description: '전화번호',
    required: true,
  })
  @Prop()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: '경상',
    description: '지역',
    required: true,
  })
  @Prop()
  @IsNotEmpty()
  local: Local;

  @ApiProperty({
    example: '남성',
    description: '성별',
    required: true,
  })
  @Prop()
  @IsString()
  @IsNotEmpty()
  gender: Gender;
  //필수필드
  @ApiProperty({
    example: '골드',
    description: '티어',
    required: true,
  })
  @Prop()
  tier: Tier;

  @ApiProperty({
    example: '반갑습니다',
    description: '자기소개',
    required: true,
  })
  @Prop()
  @IsString()
  intro: string;

  @ApiProperty({
    example: '24',
    description: '나이',
    required: true,
  })
  @Prop()
  @IsNumber()
  age: number;

  @ApiProperty({
    example: 'http//example.com',
    description: '프로필 사진 주소',
    required: true,
  })
  @Prop()
  @IsString()
  profileImg: string;

  @ApiProperty({
    example: '[9283923,123123,123213,232323]',
    description: '찜리스트',
    required: false,
  })
  @Prop()
  @IsString()
  choiceList: Array<string>;

  @ApiProperty({
    example: '[{챌린지1, 하},{챌린지2, 중}]',
    description: '챌린지 완료 리스트',
    required: false,
  })
  @Prop()
  @IsString()
  completedList: Array<Completed>;

  @ApiProperty({
    example: '[뱃지1,뱃지2]',
    description: '뱃지 리스트',
    required: false,
  })
  @Prop()
  @IsString()
  badgeList: Array<string>;

  @ApiProperty({
    example: '[산1,산2]',
    description: '완료한 산 리스트',
    required: false,
  })
  @Prop()
  @IsString()
  mountainList: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
