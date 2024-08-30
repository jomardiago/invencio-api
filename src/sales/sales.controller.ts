import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { CreateSaleDto } from "./dtos/createSale.dto";

@Controller({
  path: "sales",
  version: "1",
})
@UseGuards(AuthGuard)
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  createSale(@Body() data: CreateSaleDto) {
    return this.salesService.createSale(data);
  }

  @Get()
  findSales() {
    return this.salesService.findSales();
  }
}
