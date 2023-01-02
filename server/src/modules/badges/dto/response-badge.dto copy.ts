import { Types } from 'mongoose';

export class ResponseBadgeDto {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  img: string;
  title: string;
  mountain: Types.ObjectId;

  constructor(badges: ResponseBadgeDto) {
    this._id = badges._id;
    this.createdAt = badges.createdAt;
    this.updatedAt = badges.updatedAt;
    this.img = badges.img;
    this.title = badges.title;
    this.mountain = badges.mountain;
  }
}
