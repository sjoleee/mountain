import { ResponseStatusDto } from './../../common/dto/response-status';
import { ResponseUserDto } from './dto/response-user.dto';
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
import { UserService } from './services/user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: '자기정보보기' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseUserDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/profile')
  async jwtLogIn(
    @CurrentUser() currentUser: UserDto,
  ): Promise<ResponseUserDto> {
    console.log(currentUser);
    const user = await this.userService.findOneByUsername(currentUser.username);
    return new ResponseUserDto(user);
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @Post()
  async create(@Body() body: CreateUserDto): Promise<ResponseStatusDto> {
    const result = await this.userService.signUp(body);
    return new ResponseStatusDto(result);
  }

  @ApiOperation({ summary: '유저 리스트 전부 가져오기' })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new ResponseUserDto(user));
  }

  @ApiOperation({ summary: '특정 유저 가져오기' })
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    console.log(id);
    return new ResponseUserDto(await this.userService.findOneById(id));
  }

  @ApiOperation({ summary: '특정 유저 수정하기' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseStatusDto> {
    return this.userService.updateById(id, updateUserDto);
  }

  @ApiOperation({ summary: '특정 유저 삭제하기' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return this.userService.deleteOneById(id);
  }
}
