import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { CreateProductDto } from "./dtos/createProduct.dto";
import { CategoriesRepository } from "src/categories/categories.repository";

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
}
