import {
  Body,
  Controller,
  Delete,
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
@UseGuards(AdminUserGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @Get()
  findUsers() {
    return this.usersService.findUsers();
  }

  @Get("count")
  findUsersCount() {
    return this.usersService.findUsersCount();
  }

  @Patch(":userId/role")
  updateRole(@Param("userId") userId: string, @Body() data: UpdateRoleDto) {
    return this.usersService.updateRole(Number(userId), data);
  }

  @Delete(":userId")
  deleteUser(@Param("userId") userId: string) {
    return this.usersService.deleteUser(Number(userId));
  }
}
