import { AccountModule } from './../account/acoount.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AdminController } from './admin.users.controller';

@Module({
  imports: [UsersModule, AccountModule],
  controllers: [AdminController],
})
export class AdminModule {}
