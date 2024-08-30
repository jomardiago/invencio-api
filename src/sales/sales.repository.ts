import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSaleDto } from "./dtos/createSale.dto";

@Injectable()
export class SalesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createSale(data: CreateSaleDto) {
    return this.prismaService.sale.create({
      data,
    });
  }
}
