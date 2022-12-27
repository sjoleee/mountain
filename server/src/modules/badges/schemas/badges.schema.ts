import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { defaultSchema } from 'src/common/interface/default-schema';

const option: SchemaOptions = {
  collection: 'badges',
  timestamps: true,
};
@Schema(option)
export class Badges extends defaultSchema {
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  img: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Prop({
    required: false,
    default: '',
  })
  @IsOptional()
  @IsString()
  content: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'mountains',
  })
  @IsNotEmpty()
  mountain: Types.ObjectId;
}
export const BadgesSchema = SchemaFactory.createForClass(Badges);
