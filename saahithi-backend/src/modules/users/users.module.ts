import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
// import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // AdminModule,
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
