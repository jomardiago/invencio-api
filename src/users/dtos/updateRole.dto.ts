import { IsBoolean } from "class-validator";

export class UpdateRoleDto {
  @IsBoolean({
    message: "Not a valid boolean value.",
  })
  isAdmin: boolean;
}
