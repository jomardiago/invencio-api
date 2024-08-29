import { IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
  @IsString({
    message: "Old password is required.",
  })
  oldPassword: string;

  @MinLength(5, {
    message: "New password must be atleast 5 characters.",
  })
  newPassword: string;
}
