import { User } from './../schemas/user.schema';
import { IsNotEmpty, IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger';

export class UpdateUserDto extends PickType(User, [
  'username',
  'password',
] as const) {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
