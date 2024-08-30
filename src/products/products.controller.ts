import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { CreateProductDto } from "./dtos/createProduct.dto";

@Controller({
  path: "products",
  version: "1",
})
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() data: CreateProductDto) {
    return this.productsService.createProduct(data);
  }

  @Get()
  findProducts() {
    return this.productsService.findProducts();
  }
}
