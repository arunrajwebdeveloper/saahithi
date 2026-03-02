import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import { UserEvents } from '@/common/events/user.events';
import { UserRole, UserStatus } from '@/common/constants/user';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
    private readonly userEvents: UserEvents,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<UserDocument | null> {
    const createdUser = new this.userModel(registerUserDto);

    // Check if this is the designated "First Admin"
    const adminEmail = this.configService.get<string>('INITIAL_ADMIN_EMAIL');
    if (String(registerUserDto.email) === String(adminEmail)) {
      createdUser.role = UserRole.ADMIN;
      createdUser.isPremium = true;
    }

    this.userEvents.emitUserCreated({
      id: createdUser._id?.toString(),
      email: createdUser.email,
      role: createdUser.role,
    });

    return createdUser.save();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  // Used by the AuthModule (LocalStrategy) to validate credentials
  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findAll(paginationDto: PaginationDto): Promise<{
    total: number;
    limit: number;
    page: number;
    result: UserDocument[];
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    const { page = 1, limit = 10, search, sortOrder } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i');

      filter['$or'] = [
        { firstName: { $regex: searchRegex } },
        { lastName: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ];
    }

    const sort: any = { createdAt: sortOrder === 'asc' ? 1 : -1 };

    const [users, total] = await Promise.all([
      this.userModel
        .find(filter)
        .select('-password -warningCount')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.userModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      total,
      limit,
      page,
      result: users as UserDocument[],
      hasNext,
      hasPrev,
    };
  }

  async handleMaliciousActivity(id: string) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.warningCount >= 1) {
      // Second strike: Block
      user.status = UserStatus.TERMINATED;
      await user.save();
      return { message: 'User has been terminated.' };
    } else {
      // First strike: Warn
      user.warningCount += 1;
      await user.save();
      return { message: 'Warning issued.' };
    }
  }

  async activeUser(id: string): Promise<UserDocument | null> {
    const user = this.userModel.findByIdAndUpdate(
      id,
      { $set: { status: UserStatus.ACTIVE } },
      { new: true },
    );
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async inactiveUser(id: string): Promise<UserDocument | null> {
    const user = this.userModel.findByIdAndUpdate(
      id,
      { $set: { status: UserStatus.INACTIVE } },
      { new: true },
    );
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async terminateUser(id: string): Promise<UserDocument | null> {
    const user = this.userModel.findByIdAndUpdate(
      id,
      { $set: { status: UserStatus.TERMINATED } },
      { new: true },
    );
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async permanentDelete(id: string): Promise<{ deleted: boolean; id: string }> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('User not found');
    return { deleted: true, id };
  }

  // FOR ADMIN USE

  async countAll() {
    return this.userModel.countDocuments().exec();
  }

  async countPremiumUsers() {
    return this.userModel.countDocuments({ isPremium: true }).exec();
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
      .select('name email createdAt')
      .lean()
      .exec();
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
