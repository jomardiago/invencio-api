import { Injectable, NotFoundException } from "@nestjs/common";
import { SalesRepository } from "./sales.repository";
import { CreateSaleDto } from "./dtos/createSale.dto";
import { ProductsRepository } from "src/products/products.repository";

@Injectable()
export class SalesService {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async createSale(data: CreateSaleDto) {
    try {
      const product = await this.productsRepository.findProductById(
        data.productId,
      );
      if (!product) throw new NotFoundException("Product does not exists.");

      await this.salesRepository.createSale(data);

      return {
        message: "Sale created.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findSales() {
    try {
      return this.salesRepository.findSales();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
