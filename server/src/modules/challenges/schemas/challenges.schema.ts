import { Level } from './../../../common/enums/level.enum';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { Region } from 'src/common/enums/region.enum';
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
  startDate: Date;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  finishDate: Date;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  dueDate: Date;

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
  region: Region;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'users',
  })
  @IsNotEmpty()
  organizer: Types.ObjectId;

  @Prop({
    required: true,
    default: Level.HIGH,
  })
  @IsNotEmpty()
  level: Level;

  @Prop()
  conditions: Array<string>;

  @Prop({
    type: Types.ObjectId,
    required: false,
    ref: 'feeds',
  })
  @IsOptional()
  approval?: Types.ObjectId;

  @Prop({
    required: false,
  })
  @IsOptional()
  approved: boolean;
}
export const ChallengesSchema = SchemaFactory.createForClass(Challenges);
