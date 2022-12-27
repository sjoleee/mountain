import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsArray, IsBoolean } from 'class-validator';

export class FilterFeedOptionsDto {
  @ApiPropertyOptional({
    description: '해당 id가 작성한 글들 불러오기',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  readonly author?: string;

  @ApiPropertyOptional({ description: '태그로 검색', default: undefined })
  @IsOptional()
  @IsString()
  readonly tag?: string;

  @ApiPropertyOptional({ description: 'pos(true/false)', default: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  readonly pos?: boolean;

  @ApiPropertyOptional({
    description: 'like순으로 정렬할지(true/false)',
    default: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  readonly like?: boolean;
}
