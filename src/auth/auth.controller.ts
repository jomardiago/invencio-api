import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dtos/loginUser.dto";

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
}
