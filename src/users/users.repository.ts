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

  findUsers() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        password: false,
        Profile: true,
      },
    });
  }

  findUsersCount() {
    return this.prismaService.user.count();
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

  updateRole(userId: number, isAdmin: boolean) {
    return this.prismaService.user.update({
      data: {
        isAdmin,
      },
      where: {
        id: userId,
      },
    });
  }

  deleteUser(userId: number) {
    return this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
