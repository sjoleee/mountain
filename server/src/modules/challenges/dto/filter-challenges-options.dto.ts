import { Region } from 'src/common/enums/region.enum';
import { Tier } from 'src/common/enums/tier.enum';
import { Level } from 'src/common/enums/level.enum';
import { FeedEnum } from 'src/common/enums/feedtype.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class FilterChallengesOptionsDto {
  @ApiPropertyOptional({
    enum: Level,
    description: 'type(상/중/하)',
    default: undefined,
  })
  @IsOptional()
  readonly level?: Level;

  @ApiPropertyOptional({
    enum: Tier,
    description: 'type(브론즈/실버/골드/다이아/엄홍길)',
    default: undefined,
  })
  @IsOptional()
  readonly tier?: Tier;

  @ApiPropertyOptional({
    enum: Region,
    description: 'type(지역)',
    default: undefined,
  })
  @IsOptional()
  readonly region?: Region;
}
