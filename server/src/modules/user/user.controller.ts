import { ResponseUserDto } from './dto/user.dto';
import { RequestLoginDto } from './../auth/dto/request-login.dto';
import { CurrentUser } from './../../common/decorators/user.decorator';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { User } from './schemas/user.schema';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger/dist';
import { ResponseLoginDto } from '../auth/dto/response-login.dto';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseLoginDto,
  })
  @Post('login')
  logIn(@Body() data: RequestLoginDto): Promise<{ token: string }> {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseUserDto,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @ApiOperation({ summary: '유저 리스트 전부 가져오기' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: '특정 유저 가져오기' })
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

  @ApiOperation({ summary: '특정 유저 수정하기' })
  @UseGuards(JwtAuthGuard)
  @Patch(':username')
  update(
    @CurrentUser() currentUser: User,
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (currentUser.username !== username) {
      throw new UnauthorizedException('접근 오류-본인만 접근할 수 있습니다');
    }
    return this.userService.updateByUsername(username, updateUserDto);
  }

  @ApiOperation({ summary: '특정 유저 삭제하기' })
  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  remove(
    @CurrentUser() currentUser: User,
    @Param('username') username: string,
  ) {
    if (currentUser.username !== username) {
      throw new UnauthorizedException('접근 오류-본인만 접근할 수 있습니다');
    }
    return this.userService.deleteOneByUsername(username);
  }
}
