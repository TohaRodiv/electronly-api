import { Product } from "#modules/shop/product/Product";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { File } from "#modules/file/File";

export class CreateProductImageDTO {
	@ApiProperty({ title: "URL", required: false, })
	@IsString()
	url: string;

	@ApiProperty({ title: "Товар", type: () => Product, required: true,})
	product: number;

	@ApiProperty({ title: "Файл", type: () => File, required: true, })
	file: number;
}