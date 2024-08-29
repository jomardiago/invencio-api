import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { UsersRepository } from "src/users/users.repository";

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
}
