import { ArrayItemNumberValidator } from "#common/validators/ArrayItemNumberValidator";
import { BlogCategory } from "#modules/blog/category/BlogCategory";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, Validate, } from "class-validator";
import { File } from "#modules/file/File";

export class CreateArticleDTO {
	@ApiProperty({ title: "Название", required: true, })
	@IsString()
	title: string;

	@ApiProperty({ title: "Содержимое", required: false, format: "text", default: "", })
	@IsString()
	@IsOptional()
	content: string;

	@ApiProperty({ title: "Активно", required: false, default: true, })
	@IsBoolean()
	@IsOptional()
	active: boolean;

	@ApiProperty({ title: "Категория", type: () => BlogCategory, required: true, })
	category: number;

	@ApiProperty({ title: "Основное изображение", type: () => [File], required: false, format: "image", })
	@Validate(ArrayItemNumberValidator)
	@IsOptional()
	images: number[];
}