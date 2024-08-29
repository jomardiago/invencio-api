import { ConflictException, Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { CreateCategoryDto } from "./dtos/createCategory.dto";

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

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
}
