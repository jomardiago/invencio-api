import { IsBoolean, IsEmail, IsOptional, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail(undefined, {
    message: "Not a valid email.",
  })
  email: string;

  @MinLength(5, {
    message: "Password must be atleast 5 characters.",
  })
  password: string;

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}
