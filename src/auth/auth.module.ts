import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "src/users/users.repository";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, JwtService, PrismaService],
})
export class AuthModule {}
