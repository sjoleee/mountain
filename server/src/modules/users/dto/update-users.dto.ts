import { PartialType, PickType } from '@nestjs/swagger';
import { UsersDto } from './users.dto';
class _UpdateUsersDto extends PickType(UsersDto, [
  'username',
  'password',
  'profileImg',
  'region',
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
export class UpdateUsersDto extends PartialType(_UpdateUsersDto) {}
