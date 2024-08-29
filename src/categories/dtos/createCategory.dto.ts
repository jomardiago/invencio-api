import { IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
  @IsString({
    message: "Category name is required.",
  })
  @MaxLength(100, {
    message: "Category name must not be more than 100 characters.",
  })
  name: string;
}
