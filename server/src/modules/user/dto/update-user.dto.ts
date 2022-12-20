import { UserDto } from 'src/modules/user/dto/user.dto';
import { PartialType, PickType } from '@nestjs/swagger';
class _UpdateUserDto extends PickType(UserDto, [
  'username',
  'password',
  'profileImg',
  'local',
  'phoneNumber',
  'gender',
  'tier',
  'intro',
  'age',
  'choiceList',
  'completedList',
  'badgeList',
  'mountainList',
] as const) {}
export class UpdateUserDto extends PartialType(_UpdateUserDto) {}
