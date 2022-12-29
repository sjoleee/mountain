import { BadgesModule } from './../badges/badges.module';
import { Mountains } from './../mountains/schemas/mountains.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Users, UsersSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { UsersRepository } from './users.repository';
import { AccountService } from '../account/account.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    BadgesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
