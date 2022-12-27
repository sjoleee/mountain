import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class ResponseLoginDto {
  @ApiProperty({
    example: 'jwt access token',
    description: '접근할수있는 jwt access_token',
    required: true,
  })
  access_token: string;

  @ApiProperty({
    example: '639e9fdd4908b2bdeccfe54f',
    description: 'user id',
    required: true,
  })
  id: Types.ObjectId;
  constructor(responseLoginDto: ResponseLoginDto) {
    this.id = responseLoginDto.id;
    this.access_token = responseLoginDto.access_token;
  }
}
