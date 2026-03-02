import { UserRole, UserStatus } from '@/common/constants/user';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'user@example.com' })
  @Prop({ required: true, unique: true, trim: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @ApiProperty({ example: 'John' })
  @Prop({ required: true, trim: true })
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @Prop({ required: true, trim: true })
  lastName!: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @Prop({ type: String, enum: Object.values(UserRole), default: UserRole.USER })
  role!: UserRole;

  @ApiProperty({ example: false })
  @Prop({ required: true, default: false })
  isPremium!: boolean;

  @Prop({ default: 0 })
  warningCount!: number;

  @ApiProperty({ enum: UserStatus, default: UserStatus.ACTIVE })
  @Prop({
    type: String,
    enum: Object.values(UserStatus),
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @ApiProperty({ example: 'avatars/12345', required: false, nullable: true })
  @Prop({ type: String, default: null })
  avatarPublicId?: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, firstName: 1, lastName: 1 }, { unique: true });
