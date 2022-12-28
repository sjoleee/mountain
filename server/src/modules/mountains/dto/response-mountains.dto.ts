import { Types } from 'mongoose';

export class ResponseMountainsDto {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  mntiname: string;
  mntihigh: string;
  mntidetails: string;
  mnticode: string;
  mntiid: string;
  mntipic: Array<string>;
  completedList: Array<Types.ObjectId>;

  constructor(badges: ResponseMountainsDto) {
    this._id = badges._id;
    this.createdAt = badges.createdAt;
    this.updatedAt = badges.updatedAt;
    this.mntiname = badges.mntiname;
    this.mntihigh = badges.mntihigh;
    this.mntidetails = badges.mntidetails;
    this.mnticode = badges.mnticode;
    this.mntiid = badges.mntiid;
    this.mntipic = badges.mntipic;
    this.completedList = badges.completedList;
  }
}
