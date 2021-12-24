import { File } from "#modules/file/File";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber } from "class-validator";

export class CreateBannerDTO {
	@ApiProperty({ title: "Название", required: true, })
	@IsString()
	title: string;

	@ApiProperty({ title: "Подзаголовок", required: false, })
	@IsString()
	subtitle: string;

	@ApiProperty({ title: "Изображение", required: true, type: () => File, format: "image", })
	@IsNumber()
	image: number;

	@ApiProperty({ title: "Активен", required: false, default: false, })
	@IsBoolean()
	active: boolean;
}