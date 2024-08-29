import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(data: Pick<User, "email" | "password" | "isAdmin">) {
    return this.prismaService.user.create({
      data,
    });
  }

  findUserById(id: number) {
    return this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  findUserByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  updatePassword(userId: number, newPassword: string) {
    return this.prismaService.user.update({
      data: {
        password: newPassword,
      },
      where: {
        id: userId,
      },
    });
  }
}
