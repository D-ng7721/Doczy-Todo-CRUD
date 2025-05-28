import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './modules/todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      cache: true,
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    TodoModule,
  ],
})
export class AppModule {}
