import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "banners" })
export class Banner extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	@IsNumber()
	id: number;

	@ApiProperty({ title: "Название", })
	@Column()
	@IsString()
	title: string;

	@ApiProperty({ title: "Подзаголовок", })
	@Column()
	@IsString()
	subtitle: string;

	@ApiProperty({ title: "Изображение", })
	@Column()
	@IsString()
	image: string;

	@ApiProperty({ title: "Активен", })
	@Column({default: false})
	@IsBoolean()
	active: boolean;
}