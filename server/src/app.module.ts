import { ChallengesModule } from './modules/challenges/challenges.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { FeedModule } from './modules/feed/feed.module';
import mongoose from 'mongoose';
import { CommentsModule } from './modules/comments/comments.module';
import { UsersModule } from './modules/users/users.module';
import { BadgesModule } from './modules/badges/badges.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      //mongodb url을 읽을 수 있도록 설정
      useNewUrlParser: true,
      //최신 mongodb 드라이버 엔진을 사용하도록 설정
      useUnifiedTopology: true,
    }),
    UsersModule,
    AuthModule,
    FeedModule,
    CommentsModule,
    ChallengesModule,
    BadgesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', this.isDev);
  }
}
