import { ArrayItemNumberValidator } from "#common/validators/ArrayItemNumberValidator";
import { File } from "#modules/file/File";
import { Product } from "#modules/shop/product/Product";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, Validate, } from "class-validator";

export class ShopCreateCategoryDTO {
	@ApiProperty({ title: "Название", required: true, })
	@IsString()
	title: string;

	@ApiProperty({ title: "Активно", default: true, required: false, })
	@IsOptional()
	@IsBoolean()
	active: boolean;

	@ApiProperty({ title: "Товары", type: () => [Product], required: false, })
	@Validate(ArrayItemNumberValidator)
	@IsOptional()
	products: number[];

	@ApiProperty({ title: "Изображение", type: () => [File], required: false, format: "image", })
	@IsOptional()
	@Validate(ArrayItemNumberValidator)
	images: number[];
}