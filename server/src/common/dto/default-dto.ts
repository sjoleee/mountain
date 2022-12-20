import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class defaultDto {
  @ApiProperty({
    example: '63a01bee499bb3ae6c2c37b6',
    description: 'mongodb에서 생성된 ObjectId',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  _id: Types.ObjectId;

  @ApiProperty({
    example: '2020',
    description: 'createdAt',
    required: false,
  })
  @Prop({
    required: false,
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: 'updatedAt',
    description: 'updatedAt',
    required: false,
  })
  @Prop({
    required: false,
  })
  @IsNotEmpty()
  updatedAt: Date;
}
