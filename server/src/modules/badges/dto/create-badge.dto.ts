import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBadgeDto {
  @ApiProperty({
    example: 'http://badge.image.example.com',
    description: '뱃지 이미지 주소',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  img: string;

  @ApiProperty({
    example: '북한산 뱃지',
    description: '제목',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '북한산을 갔다온 자에게 주는 뱃지입니다',
    description: '뱃지 설명',
    required: true,
  })
  @IsOptional()
  content?: string;

  @ApiProperty({
    example: '2323232323',
    description: '해당하는 산 아이디',
    required: true,
  })
  @IsNotEmpty()
  @Transform(() => new Types.ObjectId())
  mountain: Types.ObjectId;
}
