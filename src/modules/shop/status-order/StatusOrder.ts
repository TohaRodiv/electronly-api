import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsString } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "order-status", })
export class StatusOrder extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({ title: "Название", })
	@Column()
	@IsString()
	name: string;

	@ApiProperty({ title: "Описание", })
	@Column()
	@IsString()
	description: string;
}