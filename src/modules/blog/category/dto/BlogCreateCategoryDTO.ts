import { ArrayItemNumberValidator } from "#common/validators/ArrayItemNumberValidator";
import { Article } from "#modules/blog/article/Article";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, Validate } from "class-validator";
import { File } from "#modules/file/File";

export class BlogCreateCategoryDTO {
	@ApiProperty({ title: "Название", required: true, })
	@IsString()
	title: string;

	@ApiProperty({ title: "Активно", required: false, default: true, })
	@IsBoolean()
	@IsOptional()
	
	active: boolean;
	
	@ApiProperty({ title: "Материалы", type: () => [Article], required: false, })
	@Validate(ArrayItemNumberValidator)
	@IsOptional()
	articles: number[];

	@ApiProperty({ title: "Изображение", type: () => [File], required: false, format: "image", })
	@IsOptional()
	@Validate(ArrayItemNumberValidator)
	images: number[]
}