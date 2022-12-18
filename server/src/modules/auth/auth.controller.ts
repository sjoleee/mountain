import { checkPassword } from 'src/utils/check-password';
import { UserService } from './../user/services/user.service';
import { CurrentUser } from './../../common/decorators/user.decorator';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseLoginDto } from './dto/response-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ResponseUserDto } from '../user/dto/response-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RequestLoginDto } from './dto/request-login.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signUp(createUserDto);
  }

  @ApiOperation({ summary: '로컬 로그인' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseLoginDto,
  })
  @Post('login')
  async logIn(@Body() requestLoginDto: RequestLoginDto) {
    const { email, password } = requestLoginDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    const compare = await checkPassword(password, user.password);
    if (!compare) {
      throw new NotFoundException('비밀번호가 잘못되었습니다');
    }
    return await this.authService.jwtLogin(user);
  }

  @ApiOperation({ summary: 'jwt 로그인' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseLoginDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  async jwtLogIn(@CurrentUser() user: ResponseUserDto) {
    return await this.userService.findOneByUsername(user.username);
  }

  @Get('google') // 1
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {
    //google login to google/callback
  }

  @Get('google/callback') // 2
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
