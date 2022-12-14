import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleModule } from './sample/sample.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import mongoose from 'mongoose';
@Module({
  imports: [
    ConfigModule.forRoot(),
    SampleModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      //mongodb url을 읽을 수 있도록 설정
      useNewUrlParser: true,
      //최신 mongodb 드라이버 엔진을 사용하도록 설정
      useUnifiedTopology: true,
    }),
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
