import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CurrentUser } from './../../common/decorators/user.decorator';
import { UserService } from './services/user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { ApiOperation } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
