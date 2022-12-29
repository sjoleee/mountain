import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { ResponseStatusDto } from 'src/common/dto/response-status';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { AccountService } from '../account/account.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilterAdminUsersOptionsDto } from '../users/dto/filter-admin-users-options.dto';
import { UsersDto } from '../users/dto/users.dto';
import { UsersService } from '../users/services/users.service';

@ApiTags('admin')
@Controller('admin/users')
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly accountService: AccountService,
  ) {}

  @ApiOperation({ summary: '유저 전부 가져오기-admin' })
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findPage(
    @Query() filter: FilterAdminUsersOptionsDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UsersDto>> {
    return await this.usersService.findPage(filter, pageOptionsDto);
  }

  @ApiOperation({ summary: '특정 유저 삭제하기' })
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return this.accountService.deleteById(id);
  }
}
