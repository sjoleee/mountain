import { UserDto } from './../../user/dto/user.dto';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { PickType } from '@nestjs/swagger/dist';

export class CreateUserDto extends PickType(UserDto, [
  'email',
  'username',
  'password',
] as const) {}
