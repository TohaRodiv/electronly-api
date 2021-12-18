import { ArrayItemNumberValidator } from "#common/validators/ArrayItemNumberValidator";
import { Product } from "#modules/shop/product/Product";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, Validate, } from "class-validator";

export class ShopCreateCategoryDTO {
	@ApiProperty({ title: "Название", required: true, })
	@IsString()
	title: string;

	@ApiProperty({ title: "Активно", default: true, required: false, })
	@IsBoolean()
	active: boolean;

	@ApiProperty({ title: "Товары", type: () => [Product], required: false, })
	@Validate(ArrayItemNumberValidator)
	@IsOptional()
	products: number[];
}