import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { ChallengesRepository } from './challenges.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenges, ChallengesSchema } from './schemas/challenges.schema';
import { AdminChallengesController } from './admin.challenges.controller';
import { Users, UsersSchema } from '../users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Challenges.name, schema: ChallengesSchema },
    ]),
    UsersModule,
  ],
  controllers: [ChallengesController, AdminChallengesController],
  providers: [ChallengesService, ChallengesRepository],
  exports: [ChallengesService, ChallengesRepository],
})
export class ChallengesModule {}
