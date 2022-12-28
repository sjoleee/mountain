import { ChallengeDto } from './dto/challenges.dto';
import { ResponseChallengeDto } from './dto/response-challenges.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ResponseStatusDto } from 'src/common/dto/response-status';
import { FilterAdminChallengesOptionsDto } from './dto/filter-admin-challenges-options.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';

@ApiTags('admin')
@Controller('admin/challenges')
export class AdminChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}
  @ApiOperation({ summary: '챌린지 전부 가져오기' })
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findPage(
    @Query() filter: FilterAdminChallengesOptionsDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ChallengeDto>> {
    return await this.challengesService.findPageAdmin(filter, pageOptionsDto);
  }

  @ApiOperation({
    summary: '해당 챌린지 id의 승인',
    description: 'approved 필드를 true로 바꿈',
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/approve')
  async update(@Param('id') id: string): Promise<ResponseStatusDto> {
    return await this.challengesService.updateApprove(id);
  }

  @ApiOperation({ summary: '해당 id 챌린지 삭제' })
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return await this.challengesService.removeById(id);
  }
}
