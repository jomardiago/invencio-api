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
    return this.prismaService.product.findMany({
      include: {
        category: true,
      },
    });
  }

  findProductById(productId: number) {
    return this.prismaService.product.findFirst({
      where: {
        id: productId,
      },
    });
  }

  findProductsByCategory(categoryId: number) {
    return this.prismaService.product.findMany({
      where: {
        categoryId,
      },
    });
  }

  findProductsCount() {
    return this.prismaService.product.count();
  }

  updateProduct(productId: number, data: UpdateProductDto) {
    return this.prismaService.product.update({
      data,
      where: {
        id: productId,
      },
    });
  }

  deleteProduct(productId: number) {
    return this.prismaService.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
