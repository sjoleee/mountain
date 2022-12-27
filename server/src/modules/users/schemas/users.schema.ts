import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
import { SchemaOptions, ObjectId, Types } from 'mongoose';
import { Gender } from 'src/common/enums/gender.enum';
import { Region } from 'src/common/enums/region.enum';
import { Role } from 'src/common/enums/role.enum';
import { Tier } from 'src/common/enums/tier.enum';
import { defaultSchema } from 'src/common/interface/default-schema';

type Completed = {
  cName: string;
  cDif: string;
};

const options: SchemaOptions = {
  collection: 'users',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
};
@Schema(options)
export class Users extends defaultSchema {
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
    example: '12341234a!',
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
  region: Region;

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
  @Prop({
    required: true,
    default: Tier.브론즈,
  })
  tier: Tier;

  @ApiProperty({
    example: '0',
    description: '점수',
    required: true,
  })
  @Prop({
    required: true,
    default: 0,
  })
  point: number;

  @ApiProperty({
    example: '반갑습니다',
    description: '자기소개',
  })
  @Prop({
    required: false,
    default: '',
  })
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
  @Prop({
    type: Array<Types.ObjectId>,
    required: true,
    ref: 'challenges',
    default: [],
  })
  completedList: Array<Types.ObjectId>;

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
  @Prop({
    type: Array<Types.ObjectId>,
    required: true,
    ref: 'mountains',
    default: [],
  })
  @IsNotEmpty()
  mountainList: Array<Types.ObjectId>;

  @ApiProperty({
    example: 'user',
    description: '권한',
    required: true,
    default: Role.User,
  })
  @Prop({
    required: true,
    default: Role.User,
  })
  roles: Role[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
