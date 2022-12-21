import { Module } from '@nestjs/common';
import { MountainsService } from './mountains.service';
import { MountainsController } from './mountains.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mountains, MountainsSchema } from './schemas/mountains.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mountains.name, schema: MountainsSchema },
    ]),
  ],
  controllers: [MountainsController],
  providers: [MountainsService],
})
export class MountainsModule {}
