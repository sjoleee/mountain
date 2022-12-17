import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class ResponseUserDto extends PickType(UserDto, [
  'email',
  'createdAt',
  'updatedAt',
  'username',
] as const) {
  constructor(user: UserDto) {
    super();
    this.email = user.email;
    this.username = user.username;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
