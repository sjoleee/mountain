import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { defaultSchema } from 'src/common/interface/default-schema';

@Schema()
export class Comment extends defaultSchema {
  @Prop()
  post: string;

  @Prop()
  author: string;

  @Prop()
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
