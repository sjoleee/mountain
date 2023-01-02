import { defaultDto } from './../../../common/dto/default-dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Comments } from 'src/modules/comments/schemas/comments.schema';
import { Types } from 'mongoose';
import { FeedEnum } from 'src/common/enums/feedtype.enum';

export class FeedDto extends defaultDto {
  @ApiProperty({
    example: 'test',
    description: '사진 제목으로 쓰일 타이틀',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'user or challenge',
    description: '피드 타입',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(FeedEnum)
  type: FeedEnum;

  @ApiProperty({
    example: '["태그1","태그2"]',
    description: '태그',
    required: true,
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
    example: '작성자 아이디 _id로 해야할까?',
    description: '작성자',
    required: true,
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    example: '반가워용',
    description: '글 내용',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: '["user1","user2"]',
    description: '좋아요한 유저들의 배열',
    default: [],
  })
  likes: Array<Types.ObjectId>;

  @IsOptional()
  comments?: Comments[];

  @IsOptional()
  lat?: number;

  @IsOptional()
  lng?: number;
}
