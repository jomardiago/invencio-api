import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService, UsersRepository, PrismaService],
})
export class UsersModule {}
