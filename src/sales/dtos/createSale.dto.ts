import { IsNumber, Min } from "class-validator";

export class CreateSaleDto {
  @IsNumber(undefined, {
    message: "Product ID is required.",
  })
  productId: number;

  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: "Selling price is required.",
    },
  )
  @Min(0, {
    message: "Selling price must not be less than 0.",
  })
  sellingPrice: number;

  @IsNumber(undefined, {
    message: "Quantity is required.",
  })
  @Min(0, {
    message: "Quantity must not be less than 0.",
  })
  quantity: number;

  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: "Total is required.",
    },
  )
  @Min(0, {
    message: "Total must not be less than 0.",
  })
  total: number;
}
