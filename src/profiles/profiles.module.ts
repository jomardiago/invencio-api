import { Module } from "@nestjs/common";
import { ProfilesService } from "./profiles.service";
import { ProfilesController } from "./profiles.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ProfilesRepository } from "./profiles.repository";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, PrismaService, ProfilesRepository, JwtService],
})
export class ProfilesModule {}
