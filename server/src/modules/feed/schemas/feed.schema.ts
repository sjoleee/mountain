import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { defaultSchema } from 'src/common/interface/default-schema';
import { SchemaOptions, ObjectId, Types } from 'mongoose';
import { Comments } from 'src/modules/comments/schemas/comments.schema';
import { FeedEnum } from 'src/common/enums/feedtype.enum';
const option: SchemaOptions = {
  collection: 'feeds',
  timestamps: true,
};

@Schema(option)
export class Feed extends defaultSchema {
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  type: FeedEnum;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  tag: Array<string>;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  feedImg: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'users',
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @Prop()
  @IsNotEmpty()
  content: string;

  @Prop({
    type: Array<Types.ObjectId>,
    required: true,
    ref: 'users',
    default: [],
  })
  likes: Array<Types.ObjectId>;

  @Prop({
    required: false,
  })
  @IsOptional()
  lat?: number;

  @Prop({
    required: false,
  })
  @IsOptional()
  lng?: number;

  readonly comments: Comments[];
}

export const _FeedSchema = SchemaFactory.createForClass(Feed);

_FeedSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});

_FeedSchema.set('toObject', { virtuals: true });
_FeedSchema.set('toJSON', { virtuals: true });

export const FeedSchema = _FeedSchema;
