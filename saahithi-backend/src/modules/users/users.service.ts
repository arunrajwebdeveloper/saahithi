import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto, UserRole } from '../auth/dto/register-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(registerUserDto);

    // Check if this is the designated "First Admin"
    const adminEmail = this.configService.get<string>('INITIAL_ADMIN_EMAIL');
    if (String(registerUserDto.email) === String(adminEmail)) {
      createdUser.role = UserRole.ADMIN;
      createdUser.isPremium = true;
    }

    return createdUser.save();
  }

  // Used by the AuthModule (LocalStrategy) to validate credentials
  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
}
