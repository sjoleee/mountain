import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2022-12-16T09:03:14.120Z',
    description: 'example createdAt',
    required: true,
  })
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2022-12-16T09:03:14.120Z',
    description: 'example updatedAt',
    required: true,
  })
  updatedAt: Date;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'swaggerID@test.com',
    description: 'example email',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'swaggerUser',
    description: 'example username',
    required: true,
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1234',
    description: 'example password',
    required: true,
  })
  password: string;
}
