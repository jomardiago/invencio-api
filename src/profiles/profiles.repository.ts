import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProfileDto } from "./dtos/createProfile.dto";
import { UpdateProfileDto } from "./dtos/updateProfile.dto";

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

  updateProfile(userId: number, data: UpdateProfileDto) {
    return this.prismaService.profile.update({
      data: {
        ...data,
        userId,
      },
      where: {
        userId,
      },
    });
  }
}
