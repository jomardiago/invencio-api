import {
  Body,
  Controller,
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

  @Patch(":saleId")
  updateSale(@Param("saleId") saleId: string, @Body() data: UpdateSaleDto) {
    return this.salesService.updateSale(Number(saleId), data);
  }
}
