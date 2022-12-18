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
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @Get(':username')
  findOne(@Body() body: User, @Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

  @ApiOperation({ summary: '특정 유저 수정하기' })
  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseStatusDto> {
    return this.userService.updateByUsername(username, updateUserDto);
  }

  @ApiOperation({ summary: '특정 유저 삭제하기' })
  @Delete(':username')
  remove(@Param('username') username: string): Promise<ResponseStatusDto> {
    return this.userService.deleteOneByUsername(username);
  }
}
