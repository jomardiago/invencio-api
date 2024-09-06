import { Injectable, NotFoundException } from "@nestjs/common";
import { SalesRepository } from "./sales.repository";
import { CreateSaleDto } from "./dtos/createSale.dto";
import { ProductsRepository } from "src/products/products.repository";
import { UpdateSaleDto } from "./dtos/updateSale.dto";

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

  async findTotalSales() {
    try {
      const response = await this.salesRepository.findTotalSales();
      return response._sum.total;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateSale(saleId: number, data: UpdateSaleDto) {
    try {
      const sale = await this.salesRepository.findSaleById(saleId);
      if (!sale) throw new NotFoundException("Sale does not exists.");

      const product = await this.productsRepository.findProductById(
        data.productId,
      );
      if (!product) throw new NotFoundException("Product does not exists.");

      await this.salesRepository.updateSale(saleId, data);

      return {
        message: "Sale updated.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteSale(saleId: number) {
    try {
      const sale = await this.salesRepository.findSaleById(saleId);
      if (!sale) throw new NotFoundException("Sale does not exists.");

      await this.salesRepository.deleteSale(saleId);

      return {
        message: "Sale deleted.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
