import { BlogCategory } from "#modules/blog/category/BlogCategory";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, } from "class-validator";

export class CreateArticleDTO {
	@ApiProperty({ title: "Название", required: true, })
	@IsString()
	title: string;

	@ApiProperty({ title: "Содержимое", required: false, format: "text", default: "", })
	@IsString()
	content: string;

	@ApiProperty({ title: "", required: false,})
	@IsString()
	@IsOptional()
	image: string;

	@ApiProperty({ title: "Активно", required: false, default: true, })
	@IsBoolean()
	active: boolean;

	@ApiProperty({ title: "Категория", type: () => BlogCategory, required: true, })
	category: number;
}