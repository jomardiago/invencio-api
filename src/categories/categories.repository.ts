import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createCategory(name: string) {
    return this.prismaService.category.create({
      data: {
        name,
      },
    });
  }

  findCategoryByName(name: string) {
    return this.prismaService.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  }

  findCategories() {
    return this.prismaService.category.findMany();
  }
}
