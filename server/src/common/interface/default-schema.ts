import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import mongoose, { Document, Mongoose, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
};
@Schema(options)
export class defaultSchema extends Document<Types.ObjectId> {
  @ApiProperty({
    example: '2020',
    description: 'Date',
    required: true,
  })
  @Prop({
    required: false,
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: 'updatedAt',
    description: 'updatedAt',
    required: true,
  })
  @Prop({
    required: false,
  })
  @IsNotEmpty()
  updatedAt: Date;

  // @ApiProperty({
  //   example: 'ObjectId',
  //   description: 'mongo id',
  //   required: true,
  // })
  // @Prop({
  //   required: false,
  // })
  // @IsNotEmpty()
  // _id: mongoose.Schema.Types.ObjectId;
}
