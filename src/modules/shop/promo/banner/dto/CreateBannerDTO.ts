import { ArrayItemNumberValidator } from "#common/validators/ArrayItemNumberValidator";
import { File } from "#modules/file/File";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber, Validate, IsOptional } from "class-validator";

export class CreateBannerDTO {
	@ApiProperty({ title: "Название", required: true, })
	@IsString()
	title: string;

	@ApiProperty({ title: "Подзаголовок", required: false, })
	@IsString()
	@IsOptional()
	subtitle: string;

	@ApiProperty({ title: "Изображение", required: true, type: () => [File], format: "image", })
	@Validate(ArrayItemNumberValidator)
	images: number[];

	@ApiProperty({ title: "Активен", required: false, default: false, })
	@IsBoolean()
	@IsOptional()
	active: boolean;
}