import { defaultDto } from './../../../common/dto/default-dto';
import { Types } from 'mongoose';

export class BadgeDto extends defaultDto {
  img: string;
  title: string;
  mountain: Types.ObjectId;
}
