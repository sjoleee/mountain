import { User } from 'src/modules/user/schemas/user.schema';
import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto extends PickType(User, [
  'email',
  'password',
] as const) {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
