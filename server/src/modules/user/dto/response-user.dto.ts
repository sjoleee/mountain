import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class ResponseUserDto extends OmitType(UserDto, ['password'] as const) {
  constructor(user: ResponseUserDto) {
    super();
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.username = user.username;
    this.email = user.email;
    this.profileImg = user.profileImg;
    this.local = user.local;
    this.phoneNumber = user.phoneNumber;
    this.gender = user.gender;
    this.tier = user.tier;
    this.intro = user.intro;
    this.age = user.age;
    this.choiceList = user.choiceList;
    this.completedList = user.completedList;
    this.badgeList = user.badgeList;
    this.mountainList = user.mountainList;
  }
}
