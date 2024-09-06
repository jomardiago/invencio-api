import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSaleDto } from "./dtos/createSale.dto";
import { UpdateSaleDto } from "./dtos/updateSale.dto";

@Injectable()
export class SalesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createSale(data: CreateSaleDto) {
    return this.prismaService.sale.create({
      data,
    });
  }

  findSales() {
    return this.prismaService.sale.findMany({
      include: {
        product: true,
      },
    });
  }

  findSaleById(saleId: number) {
    return this.prismaService.sale.findFirst({
      where: {
        id: saleId,
      },
    });
  }

  findSalesByProduct(productId: number) {
    return this.prismaService.sale.findMany({
      where: {
        productId,
      },
    });
  }

  findTotalSales() {
    return this.prismaService.sale.aggregate({
      _sum: {
        total: true,
      },
    });
  }

  findTotalQuantitySoldByProduct() {
    return this.prismaService.sale.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true,
      },
    });
  }

  updateSale(saleId: number, data: UpdateSaleDto) {
    return this.prismaService.sale.update({
      data,
      where: {
        id: saleId,
      },
    });
  }

  deleteSale(saleId: number) {
    return this.prismaService.sale.delete({
      where: {
        id: saleId,
      },
    });
  }
}
