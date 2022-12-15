import { User } from './../schemas/user.schema';
import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends PickType(User, [
  'email',
  'username',
  'password',
] as const) {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
