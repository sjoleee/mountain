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
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDto } from '../user/dto/user.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ResponseStatusDto } from 'src/common/dto/response-status';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @ApiOperation({ summary: '현재 로그인되어있는 유저가 챌린지 생성' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async create(
    @CurrentUser() currentUser: UserDto,
    @Body() createChallengeDto: CreateChallengeDto,
  ) {
    return await this.challengesService.create(currentUser, createChallengeDto);
  }

  @ApiOperation({ summary: '모든 챌린지 반환' })
  @ApiQuery({ name: 'userId', required: false, type: String })
  @Get()
  async findAll(@Query('userId') userId: string) {
    if (userId) {
      return await this.challengesService.findAllByUserId(userId);
    }
    return await this.challengesService.findAll();
  }

  @ApiOperation({ summary: '해당 id 챌린지 반환' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseChallengeDto> {
    return await this.challengesService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ): Promise<ResponseStatusDto> {
    return await this.challengesService.updateById(id, updateChallengeDto);
  }

  @ApiOperation({ summary: '해당 id 챌린지 삭제' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return await this.challengesService.removeById(id);
  }
}
