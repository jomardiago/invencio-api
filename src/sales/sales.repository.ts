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
    return this.prismaService.sale.findMany();
  }

  findSaleById(saleId: number) {
    return this.prismaService.sale.findFirst({
      where: {
        id: saleId,
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
