import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { CreateProductDto } from "./dtos/createProduct.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";

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

  @Patch(":productId")
  updateProduct(
    @Param("productId") productId: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(Number(productId), data);
  }
}
