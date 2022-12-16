import { User } from 'src/modules/user/schemas/user.schema';
//https://jojoldu.tistory.com/610
// 작성예정
// mongoose 의 가상필드를 사용할것인지,
// responseDto를 사용할건지 정해야함
// import { User } from './../schemas/user.schema';

import { ApiProperty, PickType } from '@nestjs/swagger';

export class ResponseUserDto extends PickType(User, [
  'email',
  'password',
] as const) {
  @ApiProperty({
    example: '639c34527585c3e0e60acede',
    description: 'example _id(mongodb ObjectId)',
    required: true,
  })
  _id: string;

  @ApiProperty({
    example: '2022-12-16T09:03:14.120Z',
    description: 'example createdAt',
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-12-16T09:03:14.120Z',
    description: 'example updatedAt',
    required: true,
  })
  updatedAt: Date;
}
