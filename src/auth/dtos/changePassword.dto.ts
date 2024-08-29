import { PickType } from "@nestjs/mapped-types";
import { LoginUserDto } from "./loginUser.dto";

export class ChangePasswordDto extends PickType(LoginUserDto, ["password"]) {}
