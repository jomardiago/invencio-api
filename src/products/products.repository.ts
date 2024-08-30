import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dtos/createProduct.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";

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

  findProductById(productId: number) {
    return this.prismaService.product.findFirst({
      where: {
        id: productId,
      },
    });
  }

  updateProduct(productId: number, data: UpdateProductDto) {
    return this.prismaService.product.update({
      data,
      where: {
        id: productId,
      },
    });
  }
}
