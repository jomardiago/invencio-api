import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
