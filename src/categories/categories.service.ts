import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { CreateCategoryDto } from "./dtos/createCategory.dto";
import { UpdateCategoryDto } from "./dtos/updateCategory.dto";
import { ProductsRepository } from "src/products/products.repository";

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async createCategory(data: CreateCategoryDto) {
    try {
      const category = await this.categoriesRepository.findCategoryByName(
        data.name,
      );
      if (category)
        throw new ConflictException("Category name already exists.");

      await this.categoriesRepository.createCategory(data.name);

      return {
        message: "Category created.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findCategories() {
    try {
      return this.categoriesRepository.findCategories();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findCategoriesCount() {
    try {
      return this.categoriesRepository.findCategoriesCount();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateCategory(categoryId: number, data: UpdateCategoryDto) {
    try {
      const categoryToBeUpdated =
        await this.categoriesRepository.findCategoryById(categoryId);
      let existingCategory;

      if (!categoryToBeUpdated)
        throw new NotFoundException("Category does not exists.");

      if (categoryToBeUpdated.name.toLowerCase() !== data.name.toLowerCase()) {
        existingCategory = await this.categoriesRepository.findCategoryByName(
          data.name,
        );
      }

      if (existingCategory)
        throw new ConflictException("Category name already exists.");

      await this.categoriesRepository.updateCategory(categoryId, data.name);

      return {
        message: "Category updated.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteCategory(categoryId: number) {
    try {
      const category =
        await this.categoriesRepository.findCategoryById(categoryId);
      if (!category) throw new NotFoundException("Category does not exists.");

      const productsByCategory =
        await this.productsRepository.findProductsByCategory(categoryId);
      if (productsByCategory?.length > 0)
        throw new BadRequestException(
          "Unable to delete category, there are products under this category.",
        );

      await this.categoriesRepository.deleteCategory(categoryId);

      return {
        message: "Category deleted.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
