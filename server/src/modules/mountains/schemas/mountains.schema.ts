// "mntiadd": "서울특별시 서대문구 홍은동",
// "mntiadmin": "서대문구청",
// "mntiadminnum": "02-330-1301",
// "mntidetails": "북한산이 걸쳐있는 행정구역은 서울, 경기도의 많은 지자체에 걸쳐있는 큰 산이다. 그중 조사대상지역인 서울 서대문구 행정구역의 지형은 서울 서대문구 홍은2동지역을 감싸고 있는 형태이며, 남쪽으로는 홍제천을 바라보고 있다.조사대상지역은 북한산의 남쪽끝자락에 해당되며 능선을 따라 서대문구와 은평구로 행정구역이 나눠어지며, 구기터널 부근부터는 성벽을 따라 서대문구와 종로구로 나눠어진다. 서대문구에 속하는 지역은 지형이 그다지 험하지 않아 쉽게 등산이 가능하나, 조사지역경계 너머 북쪽 지역은 다소 지세가 험한 편이다. 일반등산로의 경우 그다지 등산이 어렵지는 않으나, 바위가 많은 곳은 경사가 심한곳이 많아 등산시 많은 주의가 필요하다.백두산, 지리산, 금간산, 묘향산과 함께 오악(五岳)에 포함될 정도로 자연경관이 매우 뛰어난 편이다. 비록 조사대상지역이 북한산끝자락에 속하지만 북한산 자연경관의 감상하기엔 부족함이 없다.",
// "mntihigh": 0,
// "mntilistno": 114100801,
// "mntiname": "북한산",
// "mntinfdt": 20201201,
// "mntisummary": "",
// "mntitop": ""

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { SchemaOptions, Types } from 'mongoose';
import { defaultSchema } from 'src/common/interface/default-schema';

const options: SchemaOptions = {
  collection: 'mountains',
  timestamps: true,
};
@Schema(options)
export class Mountains extends defaultSchema {
  @ApiProperty({
    example: 'swaggerID@test.com',
    description: '이메일',
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
    example: '북한산',
    description: '산 이름',
    required: true,
  })
  @Prop({
    required: true,
  })
  mntiname: string;

  @ApiProperty({
    example: '북한산',
    description: '산 높이',
    required: true,
  })
  @Prop({
    required: true,
  })
  mntihigh: string;

  @ApiProperty({
    example:
      '북한산이 걸쳐있는 행정구역은 서울, 경기도의 많은 지자체에 걸쳐있는 큰 산이다. 그중 조사대상지역인 서울 서대문구 행정구역의 지형은 서울 서대문구 홍은2동지역을 감싸고 있는 형태이며, 남쪽으로는 홍제천을 바라보고 있다.조사대상지역은 북한산의 남쪽끝자락에 해당되며 능선을 따라 서대문구와 은평구로 행정구역이 나눠어지며, 구기터널 부근부터는 성벽을 따라 서대문구와 종로구로 나눠어진다. 서대문구에 속하는 지역은 지형이 그다지 험하지 않아 쉽게 등산이 가능하나, 조사지역경계 너머 북쪽 지역은 다소 지세가 험한 편이다. 일반등산로의 경우 그다지 등산이 어렵지는 않으나, 바위가 많은 곳은 경사가 심한곳이 많아 등산시 많은 주의가 필요하다.백두산, 지리산, 금간산, 묘향산과 함께 오악(五岳)에 포함될 정도로 자연경관이 매우 뛰어난 편이다. 비록 조사대상지역이 북한산끝자락에 속하지만 북한산 자연경관의 감상하기엔 부족함이 없다.',
    description: '산 소개',
    required: false,
  })
  @Prop({
    required: false,
  })
  @IsOptional()
  mntidetails: string;

  @ApiProperty({
    example: '2381818',
    description: '산 코드',
    required: true,
  })
  @Prop({
    required: true,
  })
  mnticode: string;

  @ApiProperty({
    example: '["사진1","사진2"]',
    description: '산 사진',
    required: true,
    default: [],
  })
  @Prop({
    required: true,
  })
  mntipic: Array<string>;

  @ApiProperty({
    example: '[198232183,123213213,123213213]',
    description: '등반한 사람 목록',
    required: true,
  })
  @Prop({
    type: Array<Types.ObjectId>,
    required: true,
    default: [],
  })
  completedList: Array<Types.ObjectId>;
}

export const MountainsSchema = SchemaFactory.createForClass(Mountains);
