import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(25)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(25)
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password?: string;

  // @IsNotEmpty()
  pictures?: File[]
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsOptional()
  password?: string;
}
