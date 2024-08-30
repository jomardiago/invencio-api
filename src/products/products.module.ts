import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { CategoriesRepository } from "src/categories/categories.repository";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    PrismaService,
    CategoriesRepository,
    JwtService,
  ],
})
export class ProductsModule {}
