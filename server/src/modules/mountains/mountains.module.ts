import { FeedModule } from './../feed/feed.module';
import { MountainsRepository } from './mountains.repository';
import { Module } from '@nestjs/common';
import { MountainsService } from './mountains.service';
import { MountainsController } from './mountains.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mountains, MountainsSchema } from './schemas/mountains.schema';
import { Users, UsersSchema } from '../users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mountains.name, schema: MountainsSchema },
      { name: Users.name, schema: UsersSchema },
    ]),
    FeedModule,
  ],
  controllers: [MountainsController],
  providers: [MountainsService, MountainsRepository],
  exports: [MountainsService, MountainsRepository],
})
export class MountainsModule {}
