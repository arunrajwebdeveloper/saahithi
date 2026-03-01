import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto, UserRole } from '../auth/dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
// import { AdminService } from '../admin/admin.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
    // private adminService: AdminService,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<UserDocument | null> {
    const createdUser = new this.userModel(registerUserDto);

    // Check if this is the designated "First Admin"
    const adminEmail = this.configService.get<string>('INITIAL_ADMIN_EMAIL');
    if (String(registerUserDto.email) === String(adminEmail)) {
      createdUser.role = UserRole.ADMIN;
      createdUser.isPremium = true;
    }

    // await this.adminService.emitLiveUpdate();

    return createdUser.save();
  }

  // Used by the AuthModule (LocalStrategy) to validate credentials
  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().select('-password').exec();
  }

  // FOR ADMIN USE

  async countAll() {
    return this.userModel.countDocuments();
  }

  async countPremiumUsers() {
    return this.userModel.countDocuments({ isPremium: true });
  }

  async calculateGrowth() {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [thisMonth, lastMonth] = await Promise.all([
      this.userModel.countDocuments({ createdAt: { $gte: startOfThisMonth } }),
      this.userModel.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth },
      }),
    ]);

    const growth =
      lastMonth === 0
        ? thisMonth > 0
          ? 100
          : 0
        : ((thisMonth - lastMonth) / lastMonth) * 100;
    return { thisMonth, lastMonth, growth: Number(growth.toFixed(2)) };
  }

  async getRecentUsers() {
    return this.userModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt');
  }

  async getProgressData(range: 'day' | 'week' | 'month' | 'year') {
    const now = new Date();
    let startDate: Date;

    switch (range) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }

    return this.userModel.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }
}
