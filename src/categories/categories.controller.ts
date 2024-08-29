import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { AdminUserGuard } from "src/users/guards/adminUser.guard";
import { CreateCategoryDto } from "./dtos/createCategory.dto";

@Controller({
  path: "categories",
  version: "1",
})
@UseGuards(AuthGuard)
@UseGuards(AdminUserGuard)
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
}
