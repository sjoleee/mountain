import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Local } from 'src/modules/user/schemas/local.enum';
export class CreateChallengeDto {
  @ApiProperty({
    example: '로고url ',
    description: '챌린지 로고',
    required: true,
  })
  @IsOptional()
  logo?: string;

  @ApiProperty({
    example: '챌린지 이름 예시',
    description: '챌린지 이름',
    required: true,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '2022-12-19T15:50:37.154Z',
    description: '마감 날짜',
    required: true,
  })
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({
    example: '2022-12-19T15:50:37.154Z',
    description: '모집 날짜',
    required: true,
  })
  @IsOptional()
  period?: Date;

  @ApiProperty({
    example: '10',
    description: '최대 인원',
    required: false,
  })
  @IsOptional()
  MaximumPeople?: number;

  @ApiProperty({
    example: '129392932',
    description: '산 아이디(일단 string 산module구현시 수정',
    required: true,
  })
  @IsOptional()
  mountain?: string;

  @ApiProperty({
    example: '우리 챌린지는 이러한 활동을 합니다',
    description: '챌린지 내용 (소개글)',
    required: true,
  })
  @IsOptional()
  content?: string;

  @ApiProperty({
    example: '3',
    description: '챌린지 점수',
    required: true,
  })
  @IsOptional()
  point?: number;

  @ApiProperty({
    example: '경상북도',
    description: '활동 지역',
    required: true,
  })
  @IsOptional()
  local?: Local;

  @ApiProperty({
    example: '상',
    description: '난이도',
    required: true,
  })
  @IsOptional()
  level?: string;
}
