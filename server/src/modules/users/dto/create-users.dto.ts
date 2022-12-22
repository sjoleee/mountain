import { ApiProperty, PickType } from '@nestjs/swagger/dist';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Gender } from 'src/common/enums/gender.enum';
import { Region } from 'src/common/enums/region.enum';
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
export class CreateUsersDto {
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
    example: '12341234a!',
    description: '비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, {
    message: 'test fail',
  })
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
    example: '경상북도',
    description: '지역',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Region)
  region: Region;

  @ApiProperty({
    example: '남성',
    description: '성별',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
  //필수필드

  @IsNotEmpty()
  @ApiProperty({
    example: 24,
    description: '나이',
    required: true,
    default: 20,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  age: number;

  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    description: '프로필 사진 주소',
    required: true,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  })
  @IsNotEmpty()
  @IsString()
  profileImg: string;
}
