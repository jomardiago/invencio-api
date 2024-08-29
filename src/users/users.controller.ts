import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { AdminUserGuard } from "./guards/adminUser.guard";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UpdateRoleDto } from "./dtos/updateRole.dto";

@Controller({
  path: "users",
  version: "1",
})
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AdminUserGuard)
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @Get()
  @UseGuards(AdminUserGuard)
  findUsers() {
    return this.usersService.findUsers();
  }

  @Patch(":userId/role")
  @UseGuards(AdminUserGuard)
  updateRole(@Param("userId") userId: string, @Body() data: UpdateRoleDto) {
    return this.usersService.updateRole(Number(userId), data);
  }
}
