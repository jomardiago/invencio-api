import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { CategoriesRepository } from "src/categories/categories.repository";
import { JwtService } from "@nestjs/jwt";
import { SalesRepository } from "src/sales/sales.repository";

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    PrismaService,
    CategoriesRepository,
    JwtService,
    SalesRepository,
  ],
})
export class ProductsModule {}
