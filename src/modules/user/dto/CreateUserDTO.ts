import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
	@ApiProperty({ title: "Логин", minLength: 4, maxLength: 200, })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ title: "E-mail", })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ title: "Пароль", minLength: 4, maxLength: 200 })
	@IsString()
	@IsNotEmpty()
	password: string;
}