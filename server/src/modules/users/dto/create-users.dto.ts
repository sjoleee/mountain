import { PickType } from '@nestjs/swagger/dist';
import { UsersDto } from './users.dto';

export class CreateUsersDto extends PickType(UsersDto, [
  'email',
  'username',
  'password',
  'phoneNumber',
  'local',
  'gender',
  'tier',
  'intro',
  'age',
  'profileImg',
] as const) {
  constructor(user: UsersDto) {
    super(user);
  }
}
