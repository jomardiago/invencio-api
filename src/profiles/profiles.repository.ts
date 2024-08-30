import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProfileDto } from "./dtos/createProfile.dto";

@Injectable()
export class ProfilesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createProfile(userId: number, data: CreateProfileDto) {
    return this.prismaService.profile.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  findProfileByUserId(userId: number) {
    return this.prismaService.profile.findFirst({
      where: {
        userId,
      },
    });
  }
}
