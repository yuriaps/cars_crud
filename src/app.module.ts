// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsModule } from './cars/cars.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
   ConfigModule.forRoot({
      isGlobal: true, // makes config accessible app-wide
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        dbName: config.get<string>('MONGO_DB_NAME'),
      }),
    }),
    CarsModule
  ],
})
export class AppModule {}
