import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(data: User) {
    return this.prismaService.user.create({
      data,
    });
  }
}
