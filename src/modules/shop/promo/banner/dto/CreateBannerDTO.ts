import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean } from "class-validator";

export class CreateBannerDTO {
	@ApiProperty({ title: "Название", required: true, })
	@IsString()
	title: string;

	@ApiProperty({ title: "Подзаголовок", required: false, })
	@IsString()
	subtitle: string;

	@ApiProperty({ title: "Изображение", required: true, })
	@IsString()
	image: string;

	@ApiProperty({ title: "Активен", required: false, default: false, })
	@IsBoolean()
	active: boolean;
}