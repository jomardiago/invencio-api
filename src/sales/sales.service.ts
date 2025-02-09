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

  async findTotalQuantitySoldByProduct() {
    try {
      const quantitySoldByProduct =
        await this.salesRepository.findTotalQuantitySoldByProduct();

      if (quantitySoldByProduct.length > 0) {
        const salesWithProductDetails = await Promise.all(
          quantitySoldByProduct.map(async (sale) => {
            const product = await this.productsRepository.findProductById(
              sale.productId,
            );

            return {
              productId: product.id,
              title: product.title,
              quantity: sale._sum.quantity,
            };
          }),
        );

        const sortedSales = salesWithProductDetails.sort(
          (a, b) => (b.quantity ?? 0) - (a.quantity ?? 0),
        );

        return sortedSales.slice(0, 5);
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findTotalSoldByProduct() {
    try {
      const totalSoldByProduct =
        await this.salesRepository.findTotalSoldByProduct();

      if (totalSoldByProduct.length > 0) {
        const salesWithProductDetails = await Promise.all(
          totalSoldByProduct.map(async (sale) => {
            const product = await this.productsRepository.findProductById(
              sale.productId,
            );

            return {
              productId: product.id,
              title: product.title,
              total: parseFloat(String(sale._sum.total)),
            };
          }),
        );

        const sortedSales = salesWithProductDetails.sort(
          (a, b) => (b.total ?? 0) - (a.total ?? 0),
        );

        return sortedSales.slice(0, 5);
      } else {
        return [];
      }
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
