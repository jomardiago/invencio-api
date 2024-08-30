import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProductDto {
  @IsString({
    message: "Title is required.",
  })
  @MaxLength(300, {
    message: "Title must not be more than 300 characters.",
  })
  title: string;

  @IsOptional()
  stock: number;

  @IsNumber(
    {},
    {
      message: "Buying price is required.",
    },
  )
  buyingPrice: number;

  @IsNumber(
    {},
    {
      message: "Selling price is required.",
    },
  )
  sellingPrice: number;

  @IsNumber(
    {},
    {
      message: "Category is required.",
    },
  )
  categoryId: number;
}
