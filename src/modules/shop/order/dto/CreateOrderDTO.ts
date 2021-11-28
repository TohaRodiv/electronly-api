import { ArrayItemNumberValidator } from "#common/validators/ArrayItemNumberValidator";
import { Product } from "#modules/shop/product/Product";
import { StatusOrder } from "#modules/shop/status-order/StatusOrder";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsPhoneNumber, IsEmail, IsOptional, Validate, IsNumber } from "class-validator";

export class CreateOrderDTO {
	@ApiProperty({ title: "ФИО", required: true, })
	@IsString()
	fio: string;

	@ApiProperty({ title: "Телефон", required: true, })
	@IsPhoneNumber("RU", { message: "Неверный формат номера телефона", })
	tel: string;

	@ApiProperty({ title: "E-mail", default: "", required: false, })
	@IsEmail({}, { message: "Неверный формат адреса электронной почты", })
	@IsOptional()
	email?: string;

	@ApiProperty({ title: "Комментарий", required: false, })
	@IsString()
	@IsOptional()
	comment?: string;

	@ApiProperty({ title: "Товары", type: () => [Product], required: false,})
	@Validate(ArrayItemNumberValidator)
	products?: number[];

	@ApiProperty({ title: "Статус", type: () => StatusOrder, required: true, })
	@IsNumber()
	status: number;
}