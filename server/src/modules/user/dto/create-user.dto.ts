import { UserDto } from './../../user/dto/user.dto';
import { PickType } from '@nestjs/swagger/dist';

export class CreateUserDto extends PickType(UserDto, [
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
  constructor(user: UserDto) {
    super(user);
  }
}
