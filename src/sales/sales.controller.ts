import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { SalesService } from "./sales.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { CreateSaleDto } from "./dtos/createSale.dto";
import { UpdateSaleDto } from "./dtos/updateSale.dto";
import { AdminUserGuard } from "src/users/guards/adminUser.guard";

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

  @Get("total")
  findTotalSales() {
    return this.salesService.findTotalSales();
  }

  @Get("quantity-sold-by-product")
  findTotalQuantitySoldByProduct() {
    return this.salesService.findTotalQuantitySoldByProduct();
  }

  @Patch(":saleId")
  updateSale(@Param("saleId") saleId: string, @Body() data: UpdateSaleDto) {
    return this.salesService.updateSale(Number(saleId), data);
  }

  @Delete(":saleId")
  @UseGuards(AdminUserGuard)
  deleteSale(@Param("saleId") saleId: string) {
    return this.salesService.deleteSale(Number(saleId));
  }
}
