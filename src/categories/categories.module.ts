import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { CategoriesRepository } from "./categories.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ProductsRepository } from "src/products/products.repository";

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoriesRepository,
    PrismaService,
    JwtService,
    ProductsRepository,
  ],
})
export class CategoriesModule {}
