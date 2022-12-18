import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDto {
  @ApiProperty({
    example: 'jwt access token',
    description: '접근할수있는 jwt access_token',
    required: true,
  })
  access_token: string;
  constructor(responseLoginDto: ResponseLoginDto) {
    this.access_token = responseLoginDto.access_token;
  }
}
