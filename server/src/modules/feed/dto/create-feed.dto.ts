import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateFeedDto {
  @ApiProperty({
    example: 'test',
    description: '사진 제목으로 쓰일 타이틀',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '["태그1","태그2"]',
    description: '태그',
    required: true,
    default: [],
  })
  @IsNotEmpty()
  tag: Array<string>;

  @ApiProperty({
    example: '이미지 주소',
    description: '이미지',
    required: true,
  })
  @IsNotEmpty()
  feedImg: string;

  @ApiProperty({
    example: '반가워용',
    description: '글 내용',
    required: true,
    default: '',
  })
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    example: 23.232323,
    description: '위도(선택)',
  })
  @IsOptional()
  lat?: number;

  @ApiPropertyOptional({
    example: 36.232323,
    description: '경도(선택)',
  })
  @IsOptional()
  lng?: number;
}
