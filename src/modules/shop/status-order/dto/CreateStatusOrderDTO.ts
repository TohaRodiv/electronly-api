import { ApiProperty } from "@nestjs/swagger";
import { IsString, } from "class-validator";

export class CreateStatusOrderDTO {
	@ApiProperty({ title: "Название", required: true, })
	@IsString()
	name: string;

	@ApiProperty({ title: "Описание", required: false, })
	@IsString()
	description: string;
}