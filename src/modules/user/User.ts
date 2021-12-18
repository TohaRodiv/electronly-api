import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsEmail, IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	@IsNumber()
	id: number;

	@ApiProperty({ title: "Логин", })
	@Column({ unique: true })
	@IsString()
	name: string;

	@ApiProperty({ title: "E-mail", })
	@Column({ unique: true })
	@IsEmail()
	email: string;

	@ApiProperty({ title: "Пароль", })
	@Column()
	@IsString()
	password: string;
}