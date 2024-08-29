import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { AuthGuard } from "./guards/auth.guard";
import { User } from "@prisma/client";
import { ChangePasswordDto } from "./dtos/changePassword.dto";

@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  loginUser(@Body() data: LoginUserDto) {
    return this.authService.loginUser(data);
  }

  @UseGuards(AuthGuard)
  @Post("change-password")
  changePassword(
    @Request() req: { user: User },
    @Body() data: ChangePasswordDto,
  ) {
    return this.authService.changePassword(req.user.id, data);
  }
}
