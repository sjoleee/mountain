import { ResponseChallengeDto } from './dto/response-challenges.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ResponseStatusDto } from 'src/common/dto/response-status';
import { UsersDto } from '../users/dto/users.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { FilterChallengesOptionsDto } from './dto/filter-challenges-options.dto';
import { ChallengeDto } from './dto/challenges.dto';
import { PageDto } from 'src/common/dto/page.dto';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @ApiOperation({ summary: '현재 로그인되어있는 유저가 챌린지 생성' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async create(
    @CurrentUser() currentUser: UsersDto,
    @Body() createChallengeDto: CreateChallengeDto,
  ) {
    return await this.challengesService.create(currentUser, createChallengeDto);
  }

  @ApiOperation({ summary: '챌린지 필터링' })
  @ApiQuery({ name: 'userId', required: false, type: String })
  @Get()
  async findPage(
    @Query() filter: FilterChallengesOptionsDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ChallengeDto>> {
    return await this.challengesService.findPage(filter, pageOptionsDto);
  }

  @ApiOperation({ summary: '해당 id 챌린지 반환' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseChallengeDto> {
    return await this.challengesService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ): Promise<ResponseStatusDto> {
    return await this.challengesService.updateById(id, updateChallengeDto);
  }

  @ApiOperation({ summary: '현재 로그인되어있는 유저가 챌린지 신청' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put(':id/apply')
  async apply(
    @Param('id') id: string,
    @CurrentUser() currentUser: UsersDto,
  ): Promise<ResponseStatusDto> {
    return await this.challengesService.apply(id, currentUser);
  }

  @ApiOperation({ summary: '주최자가 해당 userId 가 신청한 챌린지 거절' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put(':id/users/:userId/refuse')
  async refuse(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @CurrentUser() currentUser: UsersDto,
  ): Promise<ResponseStatusDto> {
    return await this.challengesService.refuse(id, userId, currentUser);
  }

  @ApiOperation({
    summary: '주최자가 해당 userId 가 신청한 챌린지 수락',
    description: 'waitingList에선 삭제,peopleList에 등록 ',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put(':id/users/:userId/accept')
  async accept(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @CurrentUser() currentUser: UsersDto,
  ): Promise<ResponseStatusDto> {
    return await this.challengesService.accept(id, userId, currentUser);
  }

  @ApiOperation({ summary: '해당 id 챌린지 삭제' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return await this.challengesService.removeById(id);
  }
}
