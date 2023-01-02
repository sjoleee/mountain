import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { UsersDto } from 'src/modules/users/dto/users.dto';

export class RequestLoginDto extends PickType(UsersDto, [
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
