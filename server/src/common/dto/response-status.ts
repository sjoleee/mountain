import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ResponseStatusDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @ApiProperty({
    example: 'success',
    description: '결과 메세지',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  constructor(result: ResponseStatusDto) {
    this.status = result.status;
    this.message = result.message;
  }
}
