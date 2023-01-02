import { checkPassword } from 'src/utils/check-password';
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
import { RequestLoginDto } from './dto/request-login.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { ResponseUsersDto } from '../users/dto/response-users.dto';
import { UsersDto } from '../users/dto/users.dto';
import { UsersService } from '../users/services/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiOperation({ summary: '로컬 로그인' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseLoginDto,
  })
  @Post('login')
  async logIn(
    @Body() requestLoginDto: RequestLoginDto,
  ): Promise<ResponseLoginDto> {
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

  @ApiOperation({ summary: '자기정보보기' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseLoginDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  async jwtLogIn(
    @CurrentUser() currentUser: UsersDto,
  ): Promise<ResponseUsersDto> {
    const user = await this.userService.findOneByUsername(currentUser.username);
    return new ResponseUsersDto(user);
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
