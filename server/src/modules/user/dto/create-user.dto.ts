import { User } from './../schemas/user.schema';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger/dist';

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
