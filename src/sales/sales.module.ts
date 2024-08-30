import { Module } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { SalesController } from "./sales.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { SalesRepository } from "./sales.repository";
import { ProductsRepository } from "src/products/products.repository";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [SalesController],
  providers: [
    SalesService,
    PrismaService,
    SalesRepository,
    ProductsRepository,
    JwtService,
  ],
})
export class SalesModule {}
