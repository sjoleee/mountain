import { FeedEnum } from 'src/common/enums/feedtype.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class FilterAdminFeedOptionsDto {
  @ApiPropertyOptional({
    enum: FeedEnum,
    description: 'type(user/challenge)',
  })
  @IsOptional()
  readonly type?: FeedEnum;
}
