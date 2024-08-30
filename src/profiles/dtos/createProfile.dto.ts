import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: "Maximum characters for first name is 100.",
  })
  firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: "Maximum characters for last name is 100.",
  })
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: "Maximum characters for contact number is 100.",
  })
  contactNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: "Maximum characters for address is 200.",
  })
  address: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: "Maximum characters for profile image url is 300.",
  })
  profileImgUrl: string;
}
