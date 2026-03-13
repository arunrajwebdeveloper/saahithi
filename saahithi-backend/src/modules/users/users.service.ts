import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import { UserEvents } from '@/common/events/user.events';
import { UserRole, UserStatus } from '@/common/enums/user';
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
    return this.userModel.findById(id).select('-password -warningCount').exec();
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

    this.userEvents.emitUserDeleted({
      imageId: result?.avatarPublicId as string,
    });

    return { deleted: true, id };
  }

  // FOR ADMIN USE

  async countAll() {
    return this.userModel.countDocuments().exec();
  }

  async countPremiumUsers() {
    return this.userModel.countDocuments({ isPremium: true }).exec();
  }

  async calculateGrowth(range: 'day' | 'week' | 'month' | 'year' = 'month') {
    const now = new Date();
    let startOfCurrent: Date;
    let startOfPrevious: Date;

    if (range === 'year') {
      startOfCurrent = new Date(now.getFullYear(), 0, 1);
      startOfPrevious = new Date(now.getFullYear() - 1, 0, 1);
    } else if (range === 'month') {
      startOfCurrent = new Date(now.getFullYear(), now.getMonth(), 1);
      startOfPrevious = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    } else if (range === 'week') {
      startOfCurrent = new Date(now);
      startOfCurrent.setDate(now.getDate() - 7);
      startOfPrevious = new Date(startOfCurrent);
      startOfPrevious.setDate(startOfCurrent.getDate() - 7);
    } else {
      // day
      startOfCurrent = new Date(now.setHours(0, 0, 0, 0));
      startOfPrevious = new Date(startOfCurrent);
      startOfPrevious.setDate(startOfCurrent.getDate() - 1);
    }

    const [currentPeriod, previousPeriod] = await Promise.all([
      this.userModel.countDocuments({ createdAt: { $gte: startOfCurrent } }),
      this.userModel.countDocuments({
        createdAt: { $gte: startOfPrevious, $lt: startOfCurrent },
      }),
    ]);

    const growth =
      previousPeriod === 0
        ? currentPeriod > 0
          ? 100
          : 0
        : ((currentPeriod - previousPeriod) / previousPeriod) * 100;

    return {
      currentPeriod,
      previousPeriod,
      growth: Number(growth.toFixed(2)),
      isPositive: growth >= 0,
    };
  }

  async getRecentUsers() {
    return this.userModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email createdAt')
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

  async getSignupTrends(startDate: Date, dateFormat: string) {
    return this.userModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          status: { $ne: UserStatus.TERMINATED },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: '$createdAt' } },
          totalSignups: { $sum: 1 },
          premiumSignups: { $sum: { $cond: ['$isPremium', 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async followUser(followerId: string, targetId: string) {
    if (followerId === targetId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    // Add target to the follower's 'following' list
    const followerUpdate = await this.userModel.findOneAndUpdate(
      { _id: followerId, following: { $ne: new Types.ObjectId(targetId) } },
      { $push: { following: new Types.ObjectId(targetId) } },
      { new: true },
    );

    if (!followerUpdate) {
      throw new BadRequestException(
        'Already following this user or user not found',
      );
    }

    // Increment the followerCount of the target user
    await this.userModel.findByIdAndUpdate(targetId, {
      $inc: { followerCount: 1 },
    });

    return { message: 'Followed successfully' };
  }

  async unfollowUser(followerId: string, targetId: string) {
    //  Remove target from follower's list
    const followerUpdate = await this.userModel.findOneAndUpdate(
      { _id: followerId, following: new Types.ObjectId(targetId) },
      { $pull: { following: new Types.ObjectId(targetId) } },
      { new: true },
    );

    if (!followerUpdate) {
      throw new BadRequestException('You are not following this user');
    }

    //  Decrement the followerCount of the target user
    await this.userModel.findByIdAndUpdate(targetId, {
      $inc: { followerCount: -1 },
    });

    return { message: 'Unfollowed successfully' };
  }

  async isFollowing(followerId: string, targetId: string): Promise<boolean> {
    const user = await this.userModel.exists({
      _id: followerId,
      following: new Types.ObjectId(targetId),
    });
    return !!user;
  }
}
