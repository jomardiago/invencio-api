import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { AdminUserGuard } from "src/users/guards/adminUser.guard";
import { CreateCategoryDto } from "./dtos/createCategory.dto";
import { UpdateCategoryDto } from "./dtos/updateCategory.dto";

@Controller({
  path: "categories",
  version: "1",
})
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() data: CreateCategoryDto) {
    return this.categoriesService.createCategory(data);
  }

  @Get()
  findCategories() {
    return this.categoriesService.findCategories();
  }

  @Get("count")
  findCategoriesCount() {
    return this.categoriesService.findCategoriesCount();
  }

  @Patch(":categoryId")
  updateCategory(
    @Param("categoryId") categoryId: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(Number(categoryId), data);
  }

  @Delete(":categoryId")
  @UseGuards(AdminUserGuard)
  deleteCategory(@Param("categoryId") categoryId: string) {
    return this.categoriesService.deleteCategory(Number(categoryId));
  }
}
