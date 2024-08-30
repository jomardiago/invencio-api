import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { CreateProductDto } from "./dtos/createProduct.dto";
import { CategoriesRepository } from "src/categories/categories.repository";
import { UpdateProductDto } from "./dtos/updateProduct.dto";

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async createProduct(data: CreateProductDto) {
    try {
      const category = await this.categoriesRepository.findCategoryById(
        data.categoryId,
      );
      if (!category) throw new NotFoundException("Category does not exists.");

      await this.productsRepository.createProduct(data);

      return {
        message: "Product created.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findProducts() {
    try {
      return this.productsRepository.findProducts();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateProduct(productId: number, data: UpdateProductDto) {
    try {
      const category = await this.categoriesRepository.findCategoryById(
        data.categoryId,
      );
      if (!category) throw new NotFoundException("Category does not exists.");

      const product = await this.productsRepository.findProductById(productId);
      if (!product) throw new NotFoundException("Product does not exists.");

      await this.productsRepository.updateProduct(productId, data);

      return {
        message: "Product updated.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteProduct(productId: number) {
    try {
      const product = await this.productsRepository.findProductById(productId);
      if (!product) throw new NotFoundException("Product does not exists.");

      await this.productsRepository.deleteProduct(productId);

      return {
        message: "Product deleted.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
