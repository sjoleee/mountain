import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, ObjectId, SchemaOptions } from 'mongoose';
import { defaultSchema } from 'src/common/interface/default-schema';

const options: SchemaOptions = {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
};
@Schema(options)
export class User extends defaultSchema {
  @ApiProperty({
    example: 'swaggerID@test.com',
    description: 'example email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'swaggerUser',
    description: 'example username',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '1234',
    description: 'example password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
