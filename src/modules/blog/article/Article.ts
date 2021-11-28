import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogCategory } from "../category/BlogCategory";

@Entity({ name: "articles" })
export class Article extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	@IsNumber()
	id: number;

	@ApiProperty({ title: "Название", })
	@Column()
	@IsString()
	title: string;

	@ApiProperty({ title: "Содержимое", format: "text", default: "", })
	@Column({ type: "text", default: "", })
	@IsString()
	content: string;

	@ApiProperty()
	@Column({ default: null, })
	@IsOptional()
	@IsString()
	image: string;

	@ApiProperty({ title: "Активно", required: false, default: true, })
	@Column({ default: true, })
	@IsBoolean()
	active: boolean;

	@ApiProperty({ title: "Категория", type: () => BlogCategory, })
	@ManyToOne(() => BlogCategory, category => category.articles)
	category: BlogCategory;
}