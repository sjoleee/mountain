import { RolesGuard } from './../../common/guard/roles.guard';
import { UsersDto } from 'src/modules/users/dto/users.dto';
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
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UsersService } from './services/users.service';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { FilterAdminUsersOptionsDto } from './dto/filter-admin-users-options.dto';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('admin')
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

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
    return this.usersService.deleteOneById(id);
  }
}
