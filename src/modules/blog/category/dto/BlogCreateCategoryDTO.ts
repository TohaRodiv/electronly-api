import { ArrayItemNumberValidator } from "#common/validators/ArrayItemNumberValidator";
import { Article } from "#modules/blog/article/Article";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, Validate } from "class-validator";

export class BlogCreateCategoryDTO {
	@ApiProperty({ title: "Название", required: true, })
	@IsString()
	title: string;

	@ApiProperty({ title: "Активно", required: false, default: true, })
	@IsBoolean()
	active: boolean;
	
	@ApiProperty({ title: "Материалы", type: () => [Article], required: false, })
	@Validate(ArrayItemNumberValidator)
	@IsOptional()
	articles: number[];
}