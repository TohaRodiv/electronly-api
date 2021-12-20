import { ShopCategory } from "#modules/shop/category/ShopCategory";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, Validate, } from "class-validator";
import { File } from "#modules/file/File";
import { ArrayItemNumberValidator } from "#common/validators/ArrayItemNumberValidator";

export class CreateProductDTO {
	@ApiProperty({ title: "Название", required: true, })
	@IsString()
	name: string;

	@ApiProperty({ title: "Описание", required: false, format: "text" })
	@IsString()
	@IsOptional()
	description: string;

	@ApiProperty({ title: "Цена", required: false, default: null, })
	@IsNumber()
	@IsOptional()
	price: number;

	@ApiProperty({ title: "Кол-во", default: null, required: false, })
	@IsNumber()
	@IsOptional()
	count: number;

	@ApiProperty({ title: "Активен", default: true, required: false, })
	@IsBoolean()
	@IsOptional()
	active: boolean;

	@ApiProperty({ title: "Категория", type: () => ShopCategory, required: true, })
	category: number;

	@ApiProperty({ title: "Изображения", type: () => [File], required: false, format: "images", })
	@Validate(ArrayItemNumberValidator)
	@IsOptional()
	images: number[];
}