import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dtos/createProduct.dto";

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createProduct(data: CreateProductDto) {
    return this.prismaService.product.create({
      data,
    });
  }

  findProducts() {
    return this.prismaService.product.findMany();
  }
}
