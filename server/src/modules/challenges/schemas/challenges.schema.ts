import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Local } from 'src/common/enums/local.enum';
import { defaultSchema } from 'src/common/interface/default-schema';

const option: SchemaOptions = {
  collection: 'challenges',
  timestamps: true,
};
@Schema(option)
export class Challenges extends defaultSchema {
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  logo: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  dueDate: Date;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  period: Date;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  MaximumPeople: number;

  @Prop({
    type: Array<Types.ObjectId>,
    required: false,
    ref: 'users',
    default: [],
  })
  waitingList: Array<Types.ObjectId>;

  @Prop({
    type: Array<Types.ObjectId>,
    required: false,
    ref: 'users',
    default: [],
  })
  peopleList: Array<Types.ObjectId>;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  mountain: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  content: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  point: number;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  local: Local;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'users',
  })
  @IsNotEmpty()
  organizer: Types.ObjectId;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  level: string;

  @Prop()
  conditions: Array<string>;
}
export const ChallengesSchema = SchemaFactory.createForClass(Challenges);
