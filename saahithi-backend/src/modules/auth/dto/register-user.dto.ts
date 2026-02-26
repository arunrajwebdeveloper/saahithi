import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
} from 'class-validator';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export class RegisterUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john@mail.com',
  })
  @IsEmail({}, { message: 'Must be a valid email address.' })
  email!: string;

  // Enforce password requirements for security
  @ApiProperty({
    description: 'The password of the user',
    example: 'strongPassword@123',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  // Optional: Add a RegEx for complexity (e.g., requires uppercase, number, symbol)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is too weak. Must contain uppercase, lowercase, number, and symbol.',
  // })
  password!: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName!: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName!: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'Admin or User',
  })
  @IsEnum(UserRole)
  role!: UserRole;
}
