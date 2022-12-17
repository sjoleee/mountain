import { UserDto } from './../../user/dto/user.dto';
import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { PickType } from '@nestjs/swagger';

export class RequestLoginDto extends PickType(UserDto, [
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
