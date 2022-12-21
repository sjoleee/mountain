import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersDto } from '../users/dto/users.dto';
import { CommentsCreateDto } from './dto/commnents.create.dto';
import { CommentsService } from './services/comments.service';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '모든 댓글 가져오기',
  })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({
    summary: '로그인한 상태로 피드id 에 댓글 남기기',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
    @CurrentUser() currentUser: UsersDto,
  ) {
    return this.commentsService.createComment(id, body, currentUser);
  }
}
