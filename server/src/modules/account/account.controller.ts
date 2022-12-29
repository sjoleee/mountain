import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ResponseStatusDto } from 'src/common/dto/response-status';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseUsersDto } from '../users/dto/response-users.dto';
import { UsersDto } from '../users/dto/users.dto';
import { UsersService } from '../users/services/users.service';
import { AccountService } from './account.service';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly usersService: UsersService,
  ) {}
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
    const user = await this.accountService.findOneByUsername(
      currentUser.username,
    );
    return new ResponseUsersDto(user);
  }

  @ApiOperation({ summary: '로그인한 유저 삭제하기' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/withdraw')
  async remove(
    @CurrentUser() currentUser: UsersDto,
  ): Promise<ResponseStatusDto> {
    const id = currentUser._id.toString();
    return await this.accountService.deleteById(id);
  }
}
