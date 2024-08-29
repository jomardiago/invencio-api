import { Controller, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { AdminUserGuard } from "./guards/adminUser.guard";

@Controller({
  path: "users",
  version: "1",
})
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AdminUserGuard)
  createUser() {
    return this.usersService.createUser();
  }
}
