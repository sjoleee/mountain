import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Badges, BadgesSchema } from './schemas/badges.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Badges.name, schema: BadgesSchema }]),
  ],
  controllers: [BadgesController],
  providers: [BadgesService],
})
export class BadgesModule {}
