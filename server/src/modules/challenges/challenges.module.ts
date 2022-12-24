import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { ChallengesRepository } from './challenges.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenges, ChallengesSchema } from './schemas/challenges.schema';
import { AdminChallengesController } from './admin.challenges.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Challenges.name, schema: ChallengesSchema },
    ]),
  ],
  controllers: [ChallengesController, AdminChallengesController],
  providers: [ChallengesService, ChallengesRepository],
  exports: [ChallengesService, ChallengesRepository],
})
export class ChallengesModule {}
