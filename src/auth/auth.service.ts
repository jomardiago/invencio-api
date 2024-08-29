import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { UsersRepository } from "src/users/users.repository";
import { ChangePasswordDto } from "./dtos/changePassword.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(data: LoginUserDto) {
    try {
      const user = await this.usersRepository.findUserByEmail(data.email);
      if (!user) throw new NotFoundException("User does not exists.");

      const passwordsMatched = await compare(data.password, user.password);
      if (!passwordsMatched)
        throw new UnauthorizedException("Invalid credentials.");

      delete user.password;
      const token = await this.jwtService.signAsync(user, {
        secret: process.env.JWT_SECRET,
      });

      return {
        ...user,
        token,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async changePassword(userId: number, data: ChangePasswordDto) {
    try {
      const user = this.usersRepository.findUserById(userId);
      if (!user) throw new NotFoundException("User does not exists.");

      const hashedPassword = await hash(data.password, 10);
      await this.usersRepository.updatePassword(userId, hashedPassword);

      return {
        message: "Password changed successfully.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
