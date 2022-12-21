import { ResponseStatusDto } from './../../common/dto/response-status';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './services/users.service';
import { UsersDto } from './dto/users.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ResponseUsersDto } from './dto/response-users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: '자기정보보기' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseUsersDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/profile')
  async jwtLogIn(
    @CurrentUser() currentUser: UsersDto,
  ): Promise<ResponseUsersDto> {
    console.log(currentUser);
    const user = await this.usersService.findOneByUsername(
      currentUser.username,
    );
    return new ResponseUsersDto(user);
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @Post()
  async create(@Body() body: CreateUsersDto): Promise<ResponseStatusDto> {
    const result = await this.usersService.signUp(body);
    return new ResponseStatusDto(result);
  }

  @ApiOperation({ summary: '유저 리스트 전부 가져오기' })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @Get()
  async findAll(): Promise<ResponseUsersDto[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => new ResponseUsersDto(user));
  }

  @ApiOperation({ summary: '특정 유저 가져오기' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<ResponseUsersDto> {
    return new ResponseUsersDto(await this.usersService.findOneById(id));
  }

  @ApiOperation({ summary: '특정 유저 수정하기' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUsersDto,
  ): Promise<ResponseStatusDto> {
    return this.usersService.updateById(id, updateUserDto);
  }

  @ApiOperation({ summary: '특정 유저 삭제하기' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return this.usersService.deleteOneById(id);
  }
}
