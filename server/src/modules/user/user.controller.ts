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
import { LoginRequestDto } from '../auth/dto/login-request.dto';
import { AuthService } from '../auth/auth.service';
import { User } from './schemas/user.schema';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  logIn(@Body() data: LoginRequestDto): Promise<{ token: string }> {
    return this.authService.jwtLogIn(data);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

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
