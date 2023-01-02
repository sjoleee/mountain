import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { UsersDto } from './users.dto';
import { Region } from 'src/common/enums/region.enum';
import { Tier } from 'src/common/enums/tier.enum';
export class UpdateUsersDto {
  @ApiProperty({
    example: 'swaggerUser',
    description: '유저네임',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    example: '경상북도',
    description: '지역',
    required: false,
  })
  @IsOptional()
  @IsEnum(Region)
  region?: Region;

  @IsOptional()
  @ApiProperty({
    example: 24,
    description: '나이',
    required: false,
    default: 20,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  age?: number;

  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    description: '프로필 사진 주소',
    required: false,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  })
  @IsOptional()
  @IsString()
  profileImg?: string;

  @IsOptional()
  @ApiProperty({
    example: '골드',
    description: '티어',
    required: false,
    default: Tier.브론즈,
  })
  tier?: Tier;

  @ApiProperty({
    example: '0',
    description: '점수',
    required: false,
  })
  @IsOptional()
  point?: number;

  @ApiProperty({
    example: '반갑습니다',
    description: '자기소개',
    required: false,
  })
  @IsOptional()
  @IsString()
  intro?: string;
}
