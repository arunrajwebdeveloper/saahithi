import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ContentModule } from './modules/content/content.module';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/users/users.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    // Setup ConfigModule (must be the first imported module)
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigService available everywhere
      // envFilePath: '.env',
    }),

    // Setup Mongoose using ConfigService to read MONGO_URI
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    // Feature Modules
    GatewayModule,
    AuthModule,
    AdminModule,
    UsersModule,
    ContentModule,
  ],
})
export class AppModule {}
