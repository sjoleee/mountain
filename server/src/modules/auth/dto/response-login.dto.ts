//https://jojoldu.tistory.com/610
// 작성예정
// mongoose 의 가상필드를 사용할것인지,
// responseDto를 사용할건지 정해야함
// import { User } from './../schemas/user.schema';

import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN3YWdnZXJJREB0ZXN0LmNvbSIsInN1YiI6IjYzOWMzNDUyNzU4NWMzZTBlNjBhY2VkZSIsImlhdCI6MTY3MTE4MTQyNSwiZXhwIjoxNzAyNzM5MDI1fQ.2p1OoSiduGCfuASuTEpuJrlZaZ1zSHh0U1KKEdcrrQ0',
    description: 'token',
    required: true,
  })
  token: string;
}
